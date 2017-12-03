var CanteenDBHelper = require("../../database/helpers/CanteenDBHelper.js");
var TimeHelper = require("../../common/TimeHelper.js");
var OpeningHourDBHelper = require("../../database/helpers/OpeningHourDBHelper");
var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');

class WaitingTimeCanteenAttributes{
    constructor(){
        this.canteen = null;
        this.time = null;
        this.day = null;
    }
    
    getCanteen(){
        return this.canteen;
    }
    setCanteen(canteen){
        this.canteen = canteen;
    }
    getTime(){
        return this.time;
    }
    setTime(time){
        this.time = time;
    }
    getDay(){
        return this.day;
    }
    setDay(day){
        this.day = day;
    }
}

module.exports = class WaitingTimeCanteenPreprocessor{
    constructor(){
        
    }
    
    parseAndValidate(req){
        var promiseFunction = function(resolve, reject){
            //instance of helper that I need
            var canteenDBHelper = new CanteenDBHelper();
            var openingHoursDBHelper = new OpeningHourDBHelper();

            var attributes = new WaitingTimeCanteenAttributes();
            
            //http attributes variables
            var codeNameAttribute = req.query.codeName;
            var timeAttribute = req.query.time;  
            var dayAttribute = req.query.day;
            
            var weekDay = parseInt(dayAttribute);
            
            var canteenGlobal;
            var timeDate = TimeHelper.getDateFromHoursAndMinutesByString(timeAttribute);
            canteenDBHelper.getCanteenByCodeName(codeNameAttribute).then(function(canteen){
                canteenGlobal = canteen;
                if(!(codeNameAttribute instanceof String) && typeof codeNameAttribute != 'string'){
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR));
                } else if(canteen === null){
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR));
                } else if(timeDate === null){
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR));
                } else if(isNaN(dayAttribute)){
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR));
                } else if(weekDay < 0 || weekDay > 6){
                    reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR));
                } else{
                    attributes.setTime(timeDate);
                    attributes.setDay(weekDay);
                    attributes.setCanteen(canteenGlobal);
                    resolve(attributes);
                }
            }, function(err){
                reject(err);
            });
        }
        return new Promise(promiseFunction);
     }
}