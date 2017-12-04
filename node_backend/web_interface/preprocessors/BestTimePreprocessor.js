var TimeHelper = require('../../common/TimeHelper.js');
var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');

class BestTimeAttributes {
    constructor(isFirstRequest, day, startDate, endDate) {
        this.isFirstRequest = isFirstRequest;
        this.day = day;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    getIsFirstRequest() {
        return this.isFirstRequest;
    }
    setIsFirstRequest(isFirstRequest) {
        this.isFirstRequest = isFirstRequest;
    }
    getDay() {
        return this.day;
    }
    setDay(day) {
        this.day = day;
    }
    getStartDate() {
        return this.startDate;
    }
    setStartDate(startDate) {
        this.startDate = startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    setEndDate(endDate) {
        this.endDate = endDate;
    }
}

module.exports = class BestWaitingTimePreprocessor{
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var promiseFunction = function(resolve, reject) {
            var bestTimeAttributes;
            var dayAttribute = req.query.day;  
            var startTimeAttribute = req.query.startTime;
            var endTimeAttribute = req.query.endTime;
            var isFirstRequest = false;
            var day = null;
            var startDate = null;
            var endDate = null;
            var error = null;
            
            if((typeof dayAttribute === 'undefined' || dayAttribute === null) &&
            (typeof startTimeAttribute === 'undefined' || startTimeAttribute === null) &&
            (typeof endTimeAttribute === 'undefined' || endTimeAttribute === null)) {
                isFirstRequest = true;
            } else if(typeof dayAttribute === 'undefined' || dayAttribute === null && !isFirstRequest) {
                error = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);
            } else if(typeof startTimeAttribute === 'undefined' || startTimeAttribute === null && !isFirstRequest) {
                error = new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR);
            } else if(typeof endTimeAttribute === 'undefined' || endTimeAttribute === null && !isFirstRequest) {
                error = new Error(HttpStatus.BAD_REQUEST, ErrorType.END_TIME_ERROR);
            } else {
                day = parseInt(dayAttribute);
                startDate = TimeHelper.getDateByTime(startTimeAttribute);
                endDate = TimeHelper.getDateByTime(endTimeAttribute);
                if(startDate > endDate) {
                    error = new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR);
                }
            }
            
            if(error !== null) {
                reject(error);
            } else {
                bestTimeAttributes = new BestTimeAttributes(isFirstRequest, day, startDate, endDate)
                resolve(bestTimeAttributes); 
            }
        }
        
        return new Promise(promiseFunction);
    }
    
}