var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');


class CodeNameListAttributes{
    constructor(){
        //NOTHING TO DO, any param must be sent
    }
}


module.exports = class BestWaitingTimePreprocessor{
    constructor(){
        
    }
    
    parseAndValidate(req){
        var promiseFunction = function(resolve, reject){
            resolve();
        }
        return new Promise(promiseFunction);
    }
}