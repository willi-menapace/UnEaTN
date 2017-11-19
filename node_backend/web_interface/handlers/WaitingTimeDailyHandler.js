var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeDailyPreprocessor = require('../preprocessors/WaitingTimeDailyPreprocessor.js');
var CanteenEntity = require('../../database/entities/CanteenEntity.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var TimeChecker = require('../../common/TimeChecker.js');
var bind = require('bind');

class StasticalData {
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
    
    processParseOfValidationFailure(res, errorDescription) {
        res.status(500);
        res.end(errorDescription);
    }
    
    addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes*60000);
    }
    
    // Search for a previsionData which has an arrive time equal to time
    getPrevisionDataByTime(previsionsData, time) {
        var previsionData = null;
        for(var i = 0; i < previsionsData.length && previsionData === null; i++) {
            if(TimeChecker.compareHoursMinutesTimes(previsionsData[i].arriveTime,  time) == 0)
                previsionData = previsionData[i];
        }
        return previsionData;
    }
    
    // This method has to be called if and only if openingHours contains at least a non null element
    getMinOpenTime(openingHours) {
        var minOpenTime = new Date(8640000000000000); // latest date
        for(var i = 0; i < openingHours.length; i++) {
            if(openingHours[i] !== null && openingHours[i].openTime < minOpenTime) 
                minOpenTime = openingHours[i].openTime;
            }
        return minOpenTime;
    }  
        
    
    // This method has to be called if and only if openingHours contains at least a non null element
    getMaxCloseTime(openingHours) {
        var maxCloseTime = new Date(-8640000000000000); // earliest date
        for(var i = 0; i < openingHours.length; i++) {
            if(openingHours[i] !== null && openingHours[i].closeTime > maxCloseTime) 
                maxCloseTime = openingHours[i].closeTime;
        }
        return maxCloseTime;
    }  
    
    processRequest(res, waitingTimeDailyAttributes) {
        var canteenDBHelper = new CanteenDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var openingHourDBHelper = new OpeningHourDBHelper();
        var weekDay = waitingTimeDailyAttributes.getDay();
        var canteens = canteenDBHelper.getAllCanteens();
        var dailyStatistics = [];
        var previsionsData = [];
        var openingHours = [];
        var minOpenTime;
        var maxCloseTime;
        var isEmptyOpeningHours = true;
        var statisticalData = null;
        var canteensPrevisionData = [];
        
        for(var i = 0; i < canteens.length; i++) {
            var canteenId = canteens[i].id;
            openingHours[i] = openingHourDBHelper.getOpeningHoursByCanteenIdAndDay(canteenId, weekDay);
            if(openingHours[i] !== null) {
                isEmptyOpeningHours = false;
                // previsionsData is an array in which each element is an array of PrevisionData elements
                previsionsData[i] = previsionDataDBHelper.getPrevisionDataByCanteenIdAndDay(canteenId, weekDay);
            } else {
                previsionsData[i] = null;
            }    
        }
        
        if(!isEmptyOpeningHours) {
            minOpenTime = getMinOpenTime(openingHours);
            maxCloseTime = getMaxCloseTime(openingHours);

            for(var timeIterator = minOpenTime; timeIterator <= maxCloseTime; timeIterator = addMinutes(timeIterator, 1)) {

                for(var j = 0; j < canteens.length; j++) {
                    // If canteen[j] is open at a given time then waiting time will be set to number of 
                    // minutes of waiting at that time, else waiting time will be set to null
                    if(openingHours[j] !== null) {
                        if(openingHours[j].openTime <= minOpenTime && openingHours[j].closeTime >= minOpenTime) {
                            canteensPrevisionData[j] = (getPrevisionDataByTime(previsionsData[j], minOpenTime)).waitSeconds / 60; 
                        } else {
                            canteensPrevisionData[j] = null; // Closed canteen due to time of closure
                        }
                    } else {
                        canteensPrevisionData[j] = null; // Closed canteen due to date of closure
                    }   
                }
                
                var statisticalData = new StatisticalData(minOpenTime, canteensPrevision);    
                dailyStatistics[i] = statisticalData;

            }      
        }
        
        var dailyStatisticsJSON = {
            statistics: dailyStatistics
        };
        
        bind.toFile('./web_interface/templates/compchart.tpl', {
            dailyStatistics: JSON.stringify(dailyStatisticsJSON)
        }, function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    }
}