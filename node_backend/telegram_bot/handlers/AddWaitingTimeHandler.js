var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var AddWaitingTimePreprocessor = require('../preprocessors/AddWaitingTimePreprocessor.js');
var MeasureEntity = require('../../database/entities/MeasureEntity.js');
var MeasureDBHelper = require('../../database/helpers/MeasureDBHelper.js');

module.exports = class AddWaitingTimeHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        //var measureDBHelper = new MeasureDBHelper();
        var preprocessor = new AddWaitingTimePreprocessor();
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
        
        var measureDBHelper = new MeasureDBHelper();
        var newMeasure = new MeasureEntity(attributes.getTelegramId(), null, attributes.getCanteen().canteenId, attributes.getArriveTime(), attributes.getWaitingTime * 60);
        measureDBHelper.addMeasure(newMeasure);
        var json = JSON.stringify({
            error: false  //to test
        });
        res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
        res.end(json);

    }
    
}