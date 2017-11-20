var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var HomePagePreprocessor = require('../preprocessors/HomePagePreprocessor.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var CanteenEntity = require('../../database/entities/CanteenEntity.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var PrevisionDataEntity = require('../../database/entities/PrevisionDataEntity.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var OpeningHourEntity = require('../../database/entities/OpeningHourEntity.js');
var bind = require('bind');
var enumify = require('enumify');

class Days extends enumify.Enum {};
Days.initEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);

class CanteenStatus extends enumify.Enum {};
CanteenStatus.initEnum({
    CLOSED: {
        id: 0,
    },
    FREE: {
        id: 1,
        threshold: 14,
    },
    BUSY: {
        id: 2,
        threshold: 29,
    },
    FULL: {
        id: 3,
        threshold: Number.MAX_SAFE_INTEGER,
    },
});

module.exports = class HomePageHandler extends ApplicationHandlerSkeleton {
    
    constructor() {
        var homePagePreprocessor = new HomePagePreprocessor();
        super(homePagePreprocessor);
    }

    processParseOfValidationFailure(res, errorDescription) {
        res.status(500);
        res.end(errorDescription);
    }

    processRequest(res, homePageAttributes) {
        
        // Methods to define kind of waiting for each canteen
        var canteenDBHelper = new CanteenDBHelper();
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var openingHourDBHelper = new OpeningHourDBHelper();
        var requestDate = new Date();
        var canteenStatus = [];
        var savedCanteens;
        var weekDay;
        // If today is SUNDAY
        if(requestDate.getDay() == 0)
            weekDay = Days.SUNDAY.ordinal;
        else
            weekDay = requestDate.getDay()-1;
        
        canteenDBHelper.getAllCanteens().then(function(canteens) {         
            savedCanteens = canteens; 
            var promiseArray = [];
            
            for(var i = 0; i < canteens.length; i++) {          
                promiseArray.push(openingHourDBHelper.getOpeningHourByCanteenIdAndDay(canteens[i].canteenId, weekDay));
            }
            
            return Promise.all(promiseArray);
            
              
        }, function(err) {
            console.log(err);
        }).then(function(openingHours) {

            var promiseArray = [];
            
            for(var i = 0; i < openingHours.length; i++) {
                if(openingHours[i] === null) {
                    promiseArray[i] = Promise.resolve(CanteenStatus.CLOSED.id);
                } else {
                    promiseArray[i] = previsionDataDBHelper.getPrevisionDataByCanteenIdAndTime(savedCanteens[i].canteenId, weekDay, requestDate);
                }
            }
            
            return Promise.all(promiseArray);
            
        }, function(err) {
            console.log(err);
        }).then(function(previsionDataArray){
            for(var i = 0; i < previsionDataArray.length; i++) {
                if(previsionDataArray[i] == CanteenStatus.CLOSED.id) {
                    canteenStatus[i] = CanteenStatus.CLOSED.id
                } else if(previsionDataArray[i] === null) {
                    canteenStatus[i] = CanteenStatus.CLOSED.id
                } else {
                    var waitingTime = previsionDataArray[i].waitSeconds / 60;
                    if(waitingTime >= 0) {
                        if(waitingTime <= CanteenStatus.FREE.threshold) {
                            canteenStatus[i] = CanteenStatus.FREE.id;
                        } else if(waitingTimes[i] <= CanteenStatus.BUSY.threshold) {
                            canteenStatus[i] = CanteenStatus.BUSY.id;
                        } else {
                            canteenStatus[i] = CanteenStatus.FULL.id;
                        }
                    } else {
                        res.status(500);
                        var errorDescription = "Invalid result from database";
                        res.end(errorDescription);
                    }
                }
            }
            
            bind.toFile('./web_interface/tpl/home.tpl', {
                    canteenAffStatus_1: canteenStatus[0],
                    canteenAffStatus_2: canteenStatus[1],
                    canteenAffStatus_3: canteenStatus[2]
            }, function(data) {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
            }); 
        }, function(err) {
            console.log(err);
        });

    }
}
                                             
                                              