var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var BestWaitingTimePreprocessor = require('../preprocessors/BestWaitingTimePreprocessor.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var PrevisionDataDBHelper = require("../../database/helpers/PrevisionDataDBHelper.js");
var PrevisionData = require("../../database/entities/PrevisionDataEntity.js");
var TimeHelper = require("../../common/TimeHelper.js");
var HttpStatus = require("../../common/HttpStatus.js");

//                                  JSON RESPONSE STRUCTURE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Values{
    constructor(bestTime, waitingTime){
        this.bestTime = bestTime;
        this.waitingTime = waitingTime;
    }
}

class BestTime{
    constructor(codeName, isClosed, values){
        this.codeName = codeName;
        this.isClosed = isClosed;
        this.values = values;
    }
}
class JsonResponse{
    constructor(bestTimesArray){
        this.bestTime = bestTimesArray;  //array
    } 
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = class BestWaitingTimeHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        var preprocessor = new BestWaitingTimePreprocessor();
        super(preprocessor);
    }
    processFailure(res, err) {
        res.status(err.statusType.status).send(err.descriptionType.errorDescription);
    }
    
    processRequest(res, attributes) {
        
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var canteenDBHelper = new CanteenDBHelper();
        
        var bestTimesArray = [];
        var canteensArray;
        canteenDBHelper.getAllCanteens().then(function(canteens){
            canteensArray = canteens;
            var promiseArray = [];
            for(var i = 0; i < canteens.length; i++){
                var ret = previsionDataDBHelper.getBestPrevisionDataByCanteenIdAndTimeRange(canteens[i].canteenId, attributes.getDay(), attributes.getStartDate(), attributes.getEndDate());
               
                promiseArray.push(ret);
            }
            
            return Promise.all(promiseArray);
        }, function(err){
            this.processFailure(res, err);
        }).then(function(previsionDataArray){
            for(var i = 0; i < previsionDataArray.length; i++){
                if(previsionDataArray[i] === null){
                    var bestTime = new BestTime(canteensArray[i].codeName, true, new Values(null, null));
                } else{
                    var bestTime = new BestTime(canteensArray[i].codeName, false, new Values(TimeHelper.fromTimeToStringHoursAndMinutes(previsionDataArray[i].arriveTime), Math.floor(previsionDataArray[i].waitSeconds / 60)) );
                }
                bestTimesArray.push(bestTime);
            }
            var jsonResponse = new JsonResponse(bestTimesArray);
            
            var json = JSON.stringify(jsonResponse);
            res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
            res.end(json);
        }, function(err){
            this.processFailure(res, err);
        });
        
    }
    
}