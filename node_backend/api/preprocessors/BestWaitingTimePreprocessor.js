
var TimeChecker = require('../../common/TimeChecker.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var OpeningDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');


class BestWaitingTimeAttributes{
    constructor(){
        this.day = null;
        this.startDate = null;
        this.endDate = null;
    }
    
    getDay(){
        return this.day;
    }
    setDay(day){
        this.day = day;
    }
    getStartDate(){
        return this.startDate;
    }
    setStartDate(startDate){
        this.startDate = startDate;
    }
    getEndDate(){
        return this.endDate;
    }
    setEndDate(endDate){
        this.endDate = endDate;
    }
}


module.exports = class BestWaitingTimePreprocessor{
    constructor(){
        
    }
    
    parseAndValidate(req){
        var promiseFunction = function(resolve, reject){
            var canteenDBHelper = new CanteenDBHelper();
            var openingDBHelper = new OpeningDBHelper();

            var attributes = new  BestWaitingTimeAttributes();
            var dayAttribute = req.query.day;  
            var startTimeAttribute = req.query.startTime;
            var endTimeAttribute = req.query.endTime;

            var startDate = TimeChecker.getDateFromHoursAndMinutesByString(startTimeAttribute);
            var endDate = TimeChecker.getDateFromHoursAndMinutesByString(endTimeAttribute);
            if(startDate === null){ //check if startTime exist and is in a correct format
                reject("Invalid date format or missing start-time-attribute");
            } else if(endDate === null){
                reject("Invalid date format or missing end-time-attribute");
            } else if(isNaN(dayAttribute)){
                reject("Invalid day, it must be a number");
            } else{
                var previsionDay = parseInt(dayAttribute);
                if(previsionDay < 0 || previsionDay > 6){
                    reject("Invalid day, it must me a number between 0 and 6");
                } else{
        
                    canteenDBHelper.getAllCanteens().then(function(canteensArray){
                        attributes.setDay(previsionDay);
                        attributes.setStartDate(startDate);
                        attributes.setEndDate(endDate);
                        
                        resolve(attributes);
                    }, function(err){
                        reject(err);
                    });
                    
                }
            }
        }
        return new Promise(promiseFunction);
    }
}