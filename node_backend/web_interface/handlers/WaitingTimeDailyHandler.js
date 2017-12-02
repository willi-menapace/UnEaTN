var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeDailyPreprocessor = require('../preprocessors/WaitingTimeDailyPreprocessor.js');
var CanteenEntity = require('../../database/entities/CanteenEntity.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var TimeHelper = require('../../common/TimeHelper.js');
var HttpStatus = require('../../common/HttpStatus.js');
var bind = require('bind');

class StatisticalData {
    constructor(time, waitingTimes) {
        this.time = time;
        this.waitingTimes = waitingTimes;
    }
}

module.exports = class WaitingTimeDailyHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new WaitingTimeDailyPreprocessor();
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
    
    processRequest(res, waitingTimeDailyAttributes) {
        const SECONDS_PER_MINUTE = 60;
        var self = this;
        var canteenDBHelper = new CanteenDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var openingHourDBHelper = new OpeningHourDBHelper();
        var weekDay = waitingTimeDailyAttributes.getDay();
        var savedCanteens;
        var savedOpeningHours;
        var canteenPrevision;
        
        canteenDBHelper.getAllCanteens().then(function(canteens) {
            savedCanteens = canteens;
            var promiseArray = [];
            
            for(var i = 0; i < canteens.length; i++) {
                var canteenId = canteens[i].canteenId;
                promiseArray[i] = openingHourDBHelper.getOpeningHourByCanteenIdAndDay(canteenId, weekDay); 
            }
            
            return Promise.all(promiseArray);
            
        }, function(err) {
            self.processFailure(res, err);
        }).then(function(openingHours) {
            savedOpeningHours = openingHours;
            var promiseArray = [];
            
            for(var i = 0; i < openingHours.length; i++) {
                if(openingHours[i] !== null) {
                    promiseArray[i] = previsionDataDBHelper.getPrevisionDataByCanteenIdAndDay(savedCanteens[i].canteenId, weekDay);
                } else {
                    promiseArray[i] = Promise.resolve(null);
                }
            }
            
            return Promise.all(promiseArray);
            
        }, function(err) {
            self.processFailure(res, err);
        }).then(function(previsionDataArray) {
            var isEmptyPrevisionDataArray = true;
            var dailyStatistics;
            
            for(var i = 0; i < previsionDataArray.length && isEmptyPrevisionDataArray; i++) {
                if(previsionDataArray[i] !== null) {
                    isEmptyPrevisionDataArray = false;
                }
            }
            
            if(!isEmptyPrevisionDataArray) {
                var minOpenDateTime = TimeHelper.getMinOpenDateTime(savedOpeningHours);
                var maxCloseDateTime = TimeHelper.getMaxCloseDateTime(savedOpeningHours);
                dailyStatistics = [];
                
                // In this case there will be at least one canteen open at that day with its corresponding previsionData
                for(var timeIterator = minOpenDateTime; timeIterator <= maxCloseDateTime; timeIterator = TimeHelper.addMinutes(timeIterator, 5)) {
                    var canteensPrevisionData = [];
                    for(var j = 0; j < previsionDataArray.length; j++) {
                        // If canteen[j] is open at a given time then waiting time will be set to number of 
                        // minutes of waiting at that time, else waiting time will be set to null
                        if(previsionDataArray[j] === null) {
                            canteensPrevisionData[j] = null; // Closed canteen due to closed canteen or no prevision for that canteen
                        } else {
                            canteenPrevision = TimeHelper.getPrevisionDataByTime(previsionDataArray[j], timeIterator);
                            var waitMinutes = Math.round(canteenPrevision.waitSeconds / SECONDS_PER_MINUTE);
                            canteensPrevisionData[j] = waitMinutes;
                        }
                    }

                    var statisticalData = new StatisticalData(TimeHelper.getTimeByDate(timeIterator), canteensPrevisionData);    
                    dailyStatistics.push(statisticalData);
                    
                }
            } else {
                // In this case there won't be any canteen open at that day
                dailyStatistics = null
            }
            
            var dailyStatisticsJSON = {
                statistics: dailyStatistics
            };

            bind.toFile('./node_backend/web_interface/tpl/compChart.tpl', {
                selectedDay: weekDay,
                dailyStatistics: JSON.stringify(dailyStatisticsJSON)
            }, function(data) {
                res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
                res.end(data);
            });

        }, function(err) {
            self.processFailure(res, err);
        });
    }
        
}