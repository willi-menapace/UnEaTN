var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeWeeklyPreprocessor = require('../preprocessors/WaitingTimeWeeklyPreprocessor.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var TimeHelper = require('../../common/TimeHelper.js');
var HttpStatus = require('../../common/HttpStatus.js');
var bind = require('bind');

class StatisticalData {
    constructor(time, waitingTime) {
        this.time = time;
        this.waitingTime = waitingTime;
    }
}

module.exports = class WaitingTimeWeeklyHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new WaitingTimeWeeklyPreprocessor();
        super(preprocessor);
    }
    
    processFailure(res, err) {
        var errorStatus = err.statusType.status;
        var errorDescription = err.descriptionType.errorDescription;
        bind.toFile('./node_backend/web_interface/tpl/error.tpl', {
            errorStatus: errorStatus,
            errorDescription: errorDescription
        }, function(data) {
            res.writeHead(errorStatus, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    
    processRequest(res, waitingTimeWeeklyAttributes) {
        const SECONDS_PER_MINUTE = 60;
        var self = this;
        var openingHourDBHelper = new OpeningHourDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var canteenId = waitingTimeWeeklyAttributes.getCanteenId();
        var statisticalData = null;
        var canteenPrevision = null;
        var savedOpeningHours;
        
        openingHourDBHelper.getOpeningHoursByCanteenId(canteenId).then(function(openingHours) {
            savedOpeningHours = openingHours;
            var promiseArray = [];
            
            if(typeof openingHours !== 'undefined' && openingHours.length > 0) {
                for(var i = 0; i < openingHours.length; i++) {
                    if(openingHours[i] === null) {
                        promiseArray[i] = Promise.resolve(null);
                    } else {
                        promiseArray[i] = previsionDataDBHelper.getPrevisionDataByCanteenIdAndDay(canteenId, openingHours[i].weekDay); 
                    }
                }
            }
            
            return Promise.all(promiseArray);
            
        }, function(err) {
            self.processFailure(res, err);
        }).then(function(previsionDataForEachDay) {
            var isEmptyPrevisionDataForEachDay = true;
            var weeklyStatistics;
            
            for(var i = 0; i < previsionDataForEachDay.length && previsionDataForEachDay; i++) {
                if(previsionDataForEachDay[i] !== null) {
                    isEmptyPrevisionDataForEachDay = false;
                }
            }
            
            if(!isEmptyPrevisionDataForEachDay) {
                // In this case there will be at least one day in which the provided canteen contains some previsions
                weeklyStatistics = [];
                if(typeof previsionDataForEachDay !== 'undefined' && previsionDataForEachDay.length > 0) {
                    for(var i = 0; i < previsionDataForEachDay.length; i++) {
                        if(previsionDataForEachDay[i] === null) {
                            // In this case the provided canteen doesn't have any previsions in weekDay i
                            weeklyStatistics[i] = null;
                        } else {
                            // In this case the provided canteen has some previsions in weekDay i
                            weeklyStatistics[i] = [];
                            var openTime = savedOpeningHours[i].openTime;
                            var openTimeDate = TimeHelper.getDateByTime(openTime);
                            var closeTime = savedOpeningHours[i].closeTime;
                            var closeTimeDate = TimeHelper.getDateByTime(closeTime);

                            for(var timeIterator = openTimeDate; timeIterator <= closeTimeDate; timeIterator = TimeHelper.addMinutes(timeIterator, 5)) {
                                canteenPrevision = TimeHelper.getPrevisionDataByTime(previsionDataForEachDay[i], timeIterator);
                                var arriveTime = TimeHelper.getTimeByDate(timeIterator);
                                var waitMinutes = Math.round(canteenPrevision.waitSeconds / SECONDS_PER_MINUTE);
                                statisticalData = new StatisticalData(arriveTime, waitMinutes);
                                weeklyStatistics[i].push(statisticalData);
                            } 
                        }  
                    }
                }    
            } else {
                // In this case there won't be any day in which the provided canteen contains some previsions
                weeklyStatistics = null;
            }
            
            var weeklyStatisticsJSON = {
                statistics: weeklyStatistics
            };
            
            bind.toFile('./node_backend/web_interface/tpl/weekChart.tpl', {
                selectedCanteen: canteenId,
                weeklyStatistics: JSON.stringify(weeklyStatisticsJSON)
            }, function(data) {
                res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
                res.end(data);
            });
              
        }, function(err) {
            self.processFailure(res, err);
        });
    }
    
}