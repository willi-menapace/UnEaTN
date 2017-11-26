var bodyParser = require('body-parser');
var TimeChecker = require('../../common/TimeChecker.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');


//defition of AddWaitingTime attributes and relative getters and setters
class AddWaitingTimeAttributes{
    
    constructor(){  
        this.telegramId = null;
        this.canteen = null;
        this.waitingTime = null;
        this.arriveTime = null;
        
    }
    getTelegramId(){
        return this.telegramId;
    }
    setTelegramId(telegramId){
        this.telegramId = telegramId;
    }
    getCanteen(){
        return this.canteen;
    }
    setCanteen(canteenCodeName){
        this.canteen = canteenCodeName;
    }
    getWaitingTime(){
        return this.waitingTime;
    }
    setWaitingTime(waitingTime){
        this.waitingTime = waitingTime;
    }
    getArriveTime(){
        return this.arriveTime;
    }
    setArriveTime(arriveTime){
        this.arriveTime = arriveTime;
    }
}

// Definition of class AddWaitingTimePreprocessor that checks if input http params are correct
module.exports = class AddWaitingTimePreprocessor{
    constructor() {
        
    }
    parseAndValidate(req){
        var promiseFunction = function(resolve, reject){
            var attributes = new AddWaitingTimeAttributes();

            //import http data into javascript variables
            var telegramIdAttribute = req.body.telegramId;
            var canteenCodeNameAttribute = req.body.codeName;
            var waitingTimeAttribute = req.body.waitingTime;
            var arriveTimeAttribute = req.body.arriveTime;

            var currentDate = new Date();
            //convert the String arriveDate in a Date object
            var arriveDate = TimeChecker.getDateFromHoursAndMinutesByString(arriveTimeAttribute);

            var canteenObject;
            var canteenDBHelper = new CanteenDBHelper();
            var openingHourDBHelper = new OpeningHourDBHelper();

            
            canteenDBHelper.getCanteenByCodeName(canteenCodeNameAttribute).then(function(canteen){
                canteenObject = canteen;
                //telegramIdAttribute is null if there is any key "telegramIdAttribute" in json file
                if(arriveDate === null){
                    return Promise.reject("Invalid arrive time");
                } else if(telegramIdAttribute == null || !Number.isInteger(telegramIdAttribute)){  //check if telegramId is an Integer
                    return Promise.reject("Invalid or missing telegramId attribute");
                } else if (!Number.isInteger(waitingTimeAttribute)){       //check if waitingTime is an integer that rapresent the waiting time
                    return Promise.reject("Invalid waitingTimeAttribute");
                } else if(typeof canteenCodeNameAttribute != 'string' && !(canteenCodeNameAttribute instanceof String)){ //check if CanteenName exist and it is a strCodeing
                    return Promise.reject("Invalid or missing Canteen CodeName");
                } else if(canteenObject !== null){
                    return openingHourDBHelper.getOpeningHourByCanteenIdAndDay(canteenObject.canteenId, currentDate.getDay());
                } else{
                    
                    return Promise.reject("Doesn't exist canteen with that CodeName");
                }
            }, function(err){  //relatives to canteenDBHelper
               
                return Promise.reject(err); 
            }).then(function(canteenSchedule){
                if(TimeChecker.compareHoursMinutesTimes(TimeChecker.getDateByTime(canteenSchedule.openTime), arriveDate) > -1 && TimeChecker.compareHoursMinutesTimes(TimeChecker.getDateByTime(canteenSchedule.closeTime), arriveDate) == -1){ //check if arriveTime is in the Canteen opening - closing Time
                    var endWaitingTimeDate = new Date(arriveDate.getTime() + (parseInt(waitingTimeAttribute) * 60000));
                    if(TimeChecker.compareHoursMinutesTimes(endWaitingTimeDate,TimeChecker.getDateByTime(canteenSchedule.closeTime)) == 1){
                        attributes.setCanteen(canteenObject);
                        attributes.setArriveTime(arriveDate);
                        attributes.setTelegramId(telegramIdAttribute);
                        attributes.setWaitingTime(waitingTimeAttribute);
                        resolve(attributes);
                    } else{
                        reject("Invalid WaitingTime: waitingTime attribute is too large");
                    }
                }else {
                    reject("Invalid arrive time!, it is incoerent with the canteen schedule of that day");
                }
            }, function(err){  //relatives to openHourDBHelper
                reject(err);
            });

        }
        return new Promise(promiseFunction);
    }
}


      //  var openingHourDBHelper = new OpeningHourDBHelper();
     //   var canteenDBHelper = new CanteenDBHelper();
      /*  
        var promiseFuncrion = function(resolve, reject) {
            
            resolve(attributi)
            
            reject(messaggioerrore)
            
        }
        
        
        return new Promise(promiseFuncrion);
        
        */
        
