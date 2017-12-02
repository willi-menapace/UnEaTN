var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var BestTimePreprocessor = require('../preprocessors/BestTimePreprocessor.js');
var CanteenDBHelper = require('../../database/helpers/CanteenDBHelper.js');
var PrevisionDataDBHelper = require('../../database/helpers/PrevisionDataDBHelper.js');
var PrevisionData = require('../../database/entities/PrevisionDataEntity.js');
var TimeHelper = require('../../common/TimeHelper.js');
var HttpStatus = require('../../common/HttpStatus.js');
var bind = require('bind');

class BestTime {
    constructor(time, waitingTime) {
        this.time = time;
        this.waitingTime = waitingTime;
    }
}

module.exports = class BestTimeHandler extends ApplicationHandlerSkeleton {
    constructor() {
        var preprocessor = new BestTimePreprocessor();
        super(preprocessor);
    }
    
    processFailure(res, err) {
        var errorStatus = err.statusType.status;
        var errorDescription = err.descriptionType.errorDescription;
        bind.toFile('./node_backend/web_interface/tpl/error.tpl', {
            errorStatus: errorStatus,
            errorDescription: errorDescription
        }, function(data) {
            res.writeHead(errorStatus, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    
    processRequest(res, bestTimeAttributes) {
        const TRUE = 1;
        const FALSE = 0;
        const SECONDS_PER_MINUTE = 60;
        var self = this;
        var previsionDataDBHelper = new PrevisionDataDBHelper();
        var canteenDBHelper = new CanteenDBHelper();
        var weekDay = bestTimeAttributes.getDay();
        var startDate = bestTimeAttributes.getStartDate();
        var endDate = bestTimeAttributes.getEndDate();
        var savedCanteens;
        var isFirstRequest = bestTimeAttributes.getIsFirstRequest();
        
        if(!isFirstRequest) {
            isFirstRequest = FALSE;
            
            canteenDBHelper.getAllCanteens().then(function(canteens) {
                savedCanteens = canteens;
                var promiseArray = [];

                if(typeof canteens !== 'undefined' && canteens.length > 0) {
                    for(var i = 0; i < canteens.length; i++) {
                        var canteenId = canteens[i].canteenId;
                        promiseArray[i] = previsionDataDBHelper.getBestPrevisionDataByCanteenIdAndTimeRange(canteenId, weekDay, startDate, endDate);
                    }
                }

                return Promise.all(promiseArray);

            }, function(err) {
                self.processFailure(res, err);
            }).then(function(previsionDataArray) {
                var isEmptyPrevisionDataArray = true;
                var bestTimes;

                for(var i = 0; i < previsionDataArray.length && isEmptyPrevisionDataArray; i++) {
                    if(previsionDataArray[i] !== null) {
                        isEmptyPrevisionDataArray = false;
                    }
                }

                if(!isEmptyPrevisionDataArray) {
                    bestTimes = [];
                    var bestTime;
                    var bestPrevision;
                    for(var i = 0; i < previsionDataArray.length; i++) {
                        if(previsionDataArray[i] === null) {
                            bestTime = null;
                        } else {
                            bestPrevision = previsionDataArray[i];
                            var arriveTime = TimeHelper.getTimeByDate(TimeHelper.getDateByTime(bestPrevision.arriveTime));
                            var waitMinutes = Math.round(bestPrevision.waitSeconds / SECONDS_PER_MINUTE);
                            bestTime = new BestTime(arriveTime, waitMinutes);
                        }
                        bestTimes.push(bestTime);
                    }    
                } else {
                    // In this case there won't be any canteen open at that time
                    bestTimes = null;
                }

                var bestWaitingTimesJSON = {
                    bestTimes: bestTimes
                };

                bind.toFile('./node_backend/web_interface/tpl/bestTime.tpl', {
                    isFirstRequest: isFirstRequest,
                    selectedDay: weekDay,
                    selectedStartTime: TimeHelper.getTimeByDate(startDate),
                    selectedEndTime: TimeHelper.getTimeByDate(endDate),
                    bestWaitingTimes: JSON.stringify(bestWaitingTimesJSON)
                }, function(data) {
                    res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
                    res.end(data);
                });

            }, function(err) {
                self.processFailure(res, err);
            });
        } else {
            isFirstRequest = TRUE;
            
            bind.toFile('./node_backend/web_interface/tpl/bestTime.tpl', {
                isFirstRequest: isFirstRequest
            }, function(data) {
                res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
                res.end(data);
            });
        }      
    }
    
}

