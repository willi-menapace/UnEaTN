var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeWeeklyPreprocessor = require('../preprocessors/WaitingTimeWeeklyPreprocessor.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var bind = require('bind');

class StatisticalData {
    constructor(time, waitingTimes) {
        this.time = time;
        this.waitingTimes = waitingTimes;
    }
}

module.exports = class WaitingTimeWeeklyHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new WaitingTimeWeeklyPreprocessor();
        super(preprocessor);
    }
    
    processParseOfValidationFailure(res, errorDescription) {
        res.status(500);
        res.end(errorDescription);
    }
    
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }
    
    getDateByTime(time) {
        const HOURS_INDEX = 0;
        const MINUTES_INDEX = 1;
        var dateTime = new Date();
        var splittedTime = time.split(":",2);
        var hours = splittedTime[HOURS_INDEX];
        var minutes = splittedTime[MINUTES_INDEX];
        dateTime.setHours(hours);
        dateTime.setMinutes(minutes);
        dateTime.setSeconds(0);
        dateTime.setMilliseconds(0);
        
        return dateTime;
    }
    
    getPrevisionDataByTime(previsionsData, time) {
        var previsionData = null;
        const HOURS_INDEX = 0;
        const MINUTES_INDEX = 1;
        for(var i = 0; i < previsionsData.length && previsionData === null; i++) {
            // TODO: Change the follow condition by calling function of TimeChecker to check if hours and minutes correspond
            var arriveTimeDate = this.getDateByTime(previsionsData[i].arriveTime);
            var arriveTimeHours = arriveTimeDate.getHours();
            var arriveTimeMinutes = arriveTimeDate.getMinutes();
            if(arriveTimeHours == time.getHours() && arriveTimeMinutes == time.getMinutes())
                previsionData = previsionsData[i];
        }
        return previsionData;
    }
    
    processRequest(res, waitingTimeWeeklyAttributes) {
        var self = this;
        var openingHourDBHelper = new OpeningHourDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var weeklyStatistics = [];
        var previsionsData = [];
        var canteenId = waitingTimeWeeklyAttributes.getCanteenId();
        var statisticalData = null;
        var canteenPrevision = null;
        var savedOpeningHours;
        var openingHours = openingHourDBHelper.getOpeningHoursByCanteenId(canteenId).then(function(openingHours) {
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
            console.log(err);
        }).then(function(previsionDataForEachDay) {
            if(typeof previsionDataForEachDay !== 'undefined' && previsionDataForEachDay.length > 0) {
                for(var i = 0; i < previsionDataForEachDay.length; i++) {
                    if(previsionDataForEachDay[i] === null) {
                        weeklyStatistics[i] = null;
                    } else {
                        weeklyStatistics[i] = [];
                        var openTime = savedOpeningHours[i].openTime;
                        var openTimeDate = self.getDateByTime(openTime);
                        console.log("openTimeDate: ", openTimeDate);
                        var closeTime = savedOpeningHours[i].closeTime;
                        var closeTimeDate = self.getDateByTime(closeTime);
                        console.log("closeTimeDate: ", closeTimeDate);
                        for(var timeIterator = openTimeDate; timeIterator <= closeTimeDate; timeIterator = self.addMinutes(timeIterator, 10)) {
                            canteenPrevision = self.getPrevisionDataByTime(previsionDataForEachDay[i], timeIterator);
                            statisticalData = new StatisticalData(timeIterator, canteenPrevision.waitSeconds / 60);
                            //console.log("statisticalData: ", statisticalData);
                            //console.log(weeklyStatistics[i]);
                            weeklyStatistics[i].push(statisticalData);
                        } 
                    }  
                }
            }
            
            var weeklyStatisticsJSON = {
                statistics: weeklyStatistics
            };
            
            // TEST
            console.log(JSON.stringify(weeklyStatisticsJSON));
            //
            
            bind.toFile('./web_interface/tpl/weekChart.tpl', {
                weeklyStatistics: JSON.stringify(weeklyStatisticsJSON)
            }, function(data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
              
        }, function(err) {
            console.log(err);
        });
    }
}