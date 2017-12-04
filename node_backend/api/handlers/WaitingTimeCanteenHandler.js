var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var WaitingTimeCanteenPreprocessor = require('../preprocessors/WaitingTimeCanteenPreprocessor.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
module.exports = class WaitingTimeCanteenHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        var preprocessor = new WaitingTimeCanteenPreprocessor();
        super(preprocessor);
    }
    processFailure(res, err) {
        res.status(err.statusType.status).send(err.descriptionType.errorDescription);
    }
    
    processRequest(res, attributes) {
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        previsionDataDBHelper.getPrevisionDataByCanteenIdAndTime(attributes.getCanteen().canteenId, attributes.getDay(), attributes.getTime()).then(function(previsionData){
            if(previsionData !== null){
                var json = JSON.stringify({
                    isClosed: false,  //to test
                    waitingTime:  Math.floor(previsionData.waitSeconds / 60)//time in secondi o in minuti?
                });
            } else{
                var json = JSON.stringify({
                    isClosed: true  //to test
                });
            }
            res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
            res.end(json); 
        }, function(err){
            this.processFailuer(res, err);
        });
        
        

    }
    
}