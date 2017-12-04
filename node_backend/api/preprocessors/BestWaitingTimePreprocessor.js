
var TimeHelper = require('../../common/TimeHelper.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var OpeningDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var Error = require('../../common/Error.js');
var ErrorType = require('../../common/ErrorType.js');
var HttpStatus = require('../../common/HttpStatus.js');


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
            //instance of helper that I need
            var canteenDBHelper = new CanteenDBHelper();
            var openingDBHelper = new OpeningDBHelper();

            var attributes = new  BestWaitingTimeAttributes();
            
            //http attributes variables
            var dayAttribute = req.query.day;  
            var startTimeAttribute = req.query.startTime;
            var endTimeAttribute = req.query.endTime;
            
            //parse startTime and endTime to date format
            var startDate = TimeHelper.getDateFromHoursAndMinutesByString(startTimeAttribute);
            var endDate = TimeHelper.getDateFromHoursAndMinutesByString(endTimeAttribute);
            if(startDate === null){                                                        //check if startTime exist and is in a correct format
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR));
            } else if(endDate === null){                                                    //check if endTime exist and is in a correct format
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.END_TIME_ERROR));
            } else if(isNaN(dayAttribute)){                                                 //chack if day is a number
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR));
            } else{
                var previsionDay = parseInt(dayAttribute);
                if(previsionDay < 0 || previsionDay > 6){                                   //check if day is a number between 0 and 6
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR));
                } else{
                    canteenDBHelper.getAllCanteens().then(function(canteensArray){
                        //set attributes object
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