
var CanteenDBHelper = require("../../database/helpers/CanteenDBHelper.js");
var TimeChecker = require("../../common/TimeChecker.js");
var OpeningHourDBHelper = require("../../database/helpers/OpeningHourDBHelper")

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
            var canteenDBHelper = new CanteenDBHelper();
            var openingHoursDBHelper = new OpeningHourDBHelper();

            var attributes = new WaitingTimeCanteenAttributes();

            var codeNameAttribute = req.query.codeName;
            var timeAttribute = req.query.time;  
            var dayAttribute = req.query.day;

            var weekDay = parseInt(dayAttribute);
            
            var canteenGlobal;
            var timeDate = TimeChecker.getDateFromHoursAndMinutesByString(timeAttribute);
            canteenDBHelper.getCanteenByCodeName(codeNameAttribute).then(function(canteen){
                canteenGlobal = canteen;
                if(!(codeNameAttribute instanceof String) && typeof codeNameAttribute != 'string'){
                    return Promise.reject("Missing Canteen Attribute");
                } else if(canteen === null){
                    return Promise.reject("Doesn't exixt any canteen with that codeName");
                } else if(timeDate === null){
                    return Promise.reject("Missing time or Incorrect date format");
                } else if(isNaN(dayAttribute)){
                    return Promise.reject("Missing day attribute or the attribute is not the correct index of the week day");
                } else if(weekDay < 0 || weekDay > 6){
                    return Promise.reject("Week day attribute is not valid, it must be ad index between 0 and 6");
                } else{
                    return openingHoursDBHelper.getOpeningHourByCanteenIdAndDay(canteen.canteenId, weekDay);
                }
            }, function(err){
                return Promise.reject(err);
            }).then(function(canteenSchedule){
                var startCanteenTime = TimeChecker.getDateByTime(canteenSchedule.openTime);
                var endCanteenTime = TimeChecker.getDateByTime(canteenSchedule.closeTime);
                if(TimeChecker.compareHoursMinutesTimes(startCanteenTime, timeDate) == -1 || TimeChecker.compareHoursMinutesTimes(timeDate, endCanteenTime) == -1){
                    reject("Invalid time, that canteen is closed!");
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