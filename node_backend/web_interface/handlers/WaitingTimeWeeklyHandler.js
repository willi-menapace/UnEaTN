var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeWeeklyPreprocessor = require('../preprocessors/WaitingTimeWeeklyPreprocessor.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var bind = require('bind');

class StasticalData {
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
    
    getPrevisionDataByTime(previsionsData, time) {
        var previsionData = null;
        for(var i = 0; i < previsionsData.length && previsionData === null; i++) {
            // TODO: Change the follow condition by calling function of TimeChecker to check if hours and minutes correspond
            if(previsionsData[i].arriveTime.getHours() == time.getHours() && previsionsData[i].arriveTime.getMinutes() == time.getMinutes())
                previsionData = previsionData[i];
        }
        return previsionData;
    }
    
    processRequest(res, waitingTimeWeeklyAttributes) {
        var openingHourDBHelper = new OpeningHourDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var canteenId = waitingTimeWeeklyAttributes.getCanteenId();
        var weeklyStatistics = [];
        var previsionsData = [];
        var openingHours = openingHourDBHelper.getOpeningHoursByCanteenId(canteenId);
        var statisticalData = null;
        var canteenPrevision = null;
        
        for(var i = 0; i < openingHours.length; i++) {
            previsionsData = previsionDataDBHelper.getPrevisionDataByCanteenIdAndDay(canteenId, openingHours[i].weekDay);
            
            var openTime = openingHours[i].openTime;
            var closeTime = openingHours[i].closeTime;
            
            for(var timeIterator = openTime; timeIterator <= closeTime; timeIterator = addMinutes(timeIterator, 1)) {
                canteenPrevision = this.getPrevisionDataByTime(previsionsData, timeIterator);
                statisticalData = new StatisticalData(timeIterator, canteenPrevision);
                weeklyStatistics[i].push(statisticalData);
            }
        }
        
        var weeklyStatisticsJSON = {
            statistics: weeklyStatistics
        };
        
        bind.toFile('./web_interface/templates/weekchart.tpl', {
            weeklyStatistics: JSON.stringify(dailyStatisticsJSON)
        }, function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    }
}