var bodyParser = require('body-parser');
var TimeHelper = require('../../common/TimeHelper.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');


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
        this.authenticationKey = "key";
    }
    parseAndValidate(req){
        
        var authKey = this.authenticationKey;
        var promiseFunction = function(resolve, reject){
            var attributes = new AddWaitingTimeAttributes();

            //import http data into javascript variables
            var authTokenAttribute = req.body.authToken;
            var telegramIdAttribute = req.body.telegramId;
            var canteenCodeNameAttribute = req.body.codeName;
            var waitingTimeAttribute = req.body.waitingTime;
            var arriveTimeAttribute = req.body.arriveTime;
            
            //convert the String arriveDate in a Date object
            var arriveDate = TimeHelper.getDateFromHoursAndMinutesByString(arriveTimeAttribute);

            var canteenObject;
            var canteenDBHelper = new CanteenDBHelper();
            var openingHourDBHelper = new OpeningHourDBHelper();
            //telegramIdAttribute is null if there is any key "telegramIdAttribute" in json file
            if(authTokenAttribute === null || (typeof authTokenAttribute != 'string' && !(authTokenAttribute instanceof String))){
                reject(new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR));
            } else if(authTokenAttribute.localeCompare(authKey) != 0){
                reject(new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR));
            } else if(arriveDate === null){
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR)); console.log("3");
            } else if(telegramIdAttribute === null || !Number.isInteger(telegramIdAttribute)){  //check if telegramId is an Integer
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.TELEGRAM_ID_ERROR)); console.log("4");
            } else if (!Number.isInteger(waitingTimeAttribute)){       //check if waitingTime is an integer that rapresent the waiting time
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.WAITING_TIME_ERROR));; console.log("5");
            } else if(typeof canteenCodeNameAttribute != 'string' && !(canteenCodeNameAttribute instanceof String)){ //check if CanteenName exist and it is a strCodeing
                reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR));  console.log("6");
            } else {
                canteenDBHelper.getCanteenByCodeName(canteenCodeNameAttribute).then(function(canteen){
                    canteenObject = canteen;
                    if(canteenObject === null){
                        reject(new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR));
                    } else{
                        attributes.setCanteen(canteenObject);
                        attributes.setArriveTime(arriveDate);
                        attributes.setTelegramId(telegramIdAttribute);
                        attributes.setWaitingTime(waitingTimeAttribute);
                        resolve(attributes);
                    }
                }, function(err){  //relatives to canteenDBHelper
                    reject(err); 
                });
            }
        }
        return new Promise(promiseFunction);
    }
}