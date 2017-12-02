var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var AddWaitingTimePreprocessor = require('../preprocessors/AddWaitingTimePreprocessor.js');
var MeasureEntity = require('../../database/entities/MeasureEntity.js');
var MeasureDBHelper = require('../../database/helpers/MeasureDBHelper.js');
var OpeningHourDBHelper = require('../../database/helpers/OpeningHourDBHelper.js');
var TimeHelper = require('../../common/TimeHelper.js');

module.exports = class AddWaitingTimeHandler extends ApplicationHandlerSkeleton{
    
    constructor(){
        //var measureDBHelper = new MeasureDBHelper();
        var preprocessor = new AddWaitingTimePreprocessor();
        super(preprocessor);
    }
    processFailure(res, err) {
        res.status(err.statusType.status).send(err.descriptionType.errorDescription);
    }
    
    processRequest(res, attributes) {
        var measureDBHelper = new MeasureDBHelper();
        var openingHourDBHelper = new OpeningHourDBHelper();
        var self = this;
        var currentDate = new Date();
        openingHourDBHelper.getOpeningHourByCanteenIdAndDay(attributes.getCanteen().canteenId, currentDate.getDay()).then(function(canteenSchedule){
            if(TimeHelper.compareHoursMinutesTimes(TimeHelper.getDateByTime(canteenSchedule.openTime), attributes.getArriveTime()) > -1 && TimeHelper.compareHoursMinutesTimes(TimeHelper.getDateByTime(canteenSchedule.closeTime), attributes.getArriveTime()) == -1){ //check if arriveTime is in the Canteen opening - closing Time
                var endWaitingTimeDate = new Date(attributes.getArriveTime().getTime() + (parseInt(attributes.getWaitingTime() * 60000)));
                var json;
                if(TimeHelper.compareHoursMinutesTimes(endWaitingTimeDate,TimeHelper.getDateByTime(canteenSchedule.closeTime)) == 1){
                    var newMeasure = new MeasureEntity(null, attributes.getTelegramId(), attributes.getCanteen().canteenId, attributes.getArriveTime(), attributes.getWaitingTime() * 60);
                    measureDBHelper.addMeasure(newMeasure).then(function(){
                            var json = JSON.stringify({
                                isClosed: false  //to test
                            });
                            res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
                            res.end(json); 
                        }, function(err){
                            self.processFailure(res, err);
                        });
                } else{
                    var json = JSON.stringify({
                        isClosed: true  //to test
                    });
                    res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
                    res.end(json); 
                }
            }else {
                var json = JSON.stringify({
                    isClosed: true  //to test
                });
                res.writeHead(200, {'Content-Type': 'application/json', 'Accept': 'application/json'});
                res.end(json); 
            }
        }, function(err){
            this.processFailure(res, err);
        });
    }
}