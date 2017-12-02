var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var CodeNameListPreprocessor = require('../preprocessors/CodeNamesPreprocessor.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');



module.exports = class CodeNameListHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        var preprocessor = new CodeNameListPreprocessor();
        super(preprocessor);
    }
    processFailure(res, errorDescription) {
        
        var json = JSON.stringify({
            error: true,  //to test
            errorDescription: errorDescription
        });
        res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
        res.end(json);
    }
    
    processRequest(res, attributes) {
        
        var codeNames = [];
        var canteenDBHelper = new CanteenDBHelper();
        canteenDBHelper.getAllCanteens().then(function(canteensArray){
            if(canteensArray.length == 0){
                var json = JSON.stringify({
                    codeName: null
                });
            } else{
                for(var i = 0; i < canteensArray.length; i++){
                    codeNames[i] = canteensArray[i].codeName;
                }
                var json = JSON.stringify({
                    codeName: codeNames
                });
            }
            res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
            res.end(json);
        }, function(err){
            this.processFailure(res, err);
        });
        
    }
    
}