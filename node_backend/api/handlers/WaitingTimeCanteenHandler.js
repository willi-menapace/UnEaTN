var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeCanteenPreprocessor = require('../preprocessors/WaitingTimeCanteenPreprocessor.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var TimeChecker = require("../../common/TimeChecker.js");

module.exports = class WaitingTimeCanteenHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        var preprocessor = new WaitingTimeCanteenPreprocessor();
        super(preprocessor);
    }
    processParseOfValidationFailure(res, errorDescription) {
        
        var json = JSON.stringify({
            error: true,  //to test
            errorDescription: errorDescription 
            
        });
        res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
        res.end(json);
    }
    
    processRequest(res, attributes) {
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        
        previsionDataDBHelper.getPrevisionDataByCanteenIdAndTime(attributes.getCanteen().canteenId, attributes.getTime(), attributes.getDay()).then(function(previsionData){
            if(previsionData !== null){
                var json = JSON.stringify({
                    error: false,  //to test
                    waitingTime:  previsionData.waitSeconds / 60//time in secondi o in minuti?
                });
            } else{
                var json = JSON.stringify({
                    error: false,  //to test
                    waitingTime:  null
                });
            }
            res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
            res.end(json); 
        }, function(err){
            console.log(err);
        });
        

    }
    
}