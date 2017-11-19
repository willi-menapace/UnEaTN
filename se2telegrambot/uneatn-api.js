/*
* Node.js module for accessing the unEATn RESTful API
* Handles HTTP request and response, hiding all the implementation details
*
* Author: Giuliani Daniele
*/

const URL_UNEATN = 'http://localhost:8080';

var request = require('request');

//TODO recheck api specification, set different url, and url postfix

/* ERROR MESSAGES */
const MISSING_PARAM = "Missing parameters!";
const BAD_PARAM = "Bad parameters!";
const REQ_FAIL = "Request failed!";

/*
* Method for querying the waiting time of a specific canteen in a certain moment
* Returns a promise containing:
*   waitingTime (number) - if promise was resolved succesfully
*   error message - if promise was rejected
*/
function waitingTimeCanteen(canteenName, hour, minute, dayOfTheWeek) {
    const URL_POSTFIX = '/api/waitingTimeCanteen';

    return new Promise(function(resolve, reject) {
        if(canteenName === undefined || hour === undefined || minute === undefined || dayOfTheWeek === undefined) {
            reject(MISSING_PARAM);
            return;
        }
        if(isNaN(hour) || isNaN(minute) || isNaN(dayOfTheWeek)) {
            reject(BAD_PARAM);
            return;
        }
        var time = hour + ':' + minute;

        var jsonBody = {
            'canteenName':canteenName,
            'time':time,
            'day':dayOfTheWeek
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'GET',
            body: jsonBody,
            json:true
        };

        request(options, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                //controllo parametro errore sul json
                if(body.error === false) {
                    if(!isNaN(body.waitingTime)) {
                        console.log(body);
                        resolve(body.waitingTime);
                        return;
                    }
                }
            }
            reject(REQ_FAIL);
            return;
        });

    });
}


/*
* Method for querying the best time to eat of all the canteen provided a time intrval
* Returns a promise containing:
*   A json object containing n (number of canteens) record, if the request was successfull
*       record pattern: 'canteenName':{'bestHour':'HH', 'bestMinute':'MM', 'waitingTime':99}
*       if the promise was resolved succesfully
*   error message - if promise was rejected
*/
function bestWaitingTime(startHour, startMinute, endHour, endMinute, dayOfTheWeek) {
    const URL_POSTFIX = '/api/bestWaitingTime';

    return new Promise(function(resolve, reject) {
        if(startHour === undefined || startMinute === undefined || endHour === undefined || endMinute === undefined || dayOfTheWeek === undefined) {
            reject(MISSING_PARAM);
            return;
        }
        if(isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute) || isNaN(dayOfTheWeek)) {
            reject(BAD_PARAM);
            return
        }

        var startTime = startHour + ':' + startMinute;
        var endTime = endHour + ':' + endMinute;

        var jsonBody = {
            'startTime':startTime,
            'endTime':endTime,
            'day':dayOfTheWeek
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'GET',
            body: jsonBody,
            json:true
        };

        request(options, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                //controllo parametro errore sul json
                if(body.error === false) {
                    var jsonAnswer = body.bestWaitingTimes;
                    resolve(jsonAnswer);
                    return;
                }
            }
            reject(REQ_FAIL);
            return;
        });
    });
}

/*
* Method for the submission of the waiting time
* Returns a promise containing:
*   true - if request was completed succesfully
*   error message - otherwise
*/
function addWaitingTime(telegramID, canteenName, waitingTime, arriveHour, arriveMinute) {
    const URL_POSTFIX = '/addWaitingTime';

    return new Promise(function(resolve, reject) {
        if(telegramID === undefined || canteenName === undefined || waitingTime === undefined || arriveHour === undefined || arriveMinute === undefined) {
            reject(MISSING_PARAM);
            return;
        }
        if(isNaN(waitingTime) || isNaN(arriveHour) || isNaN(arriveMinute)) {
            reject(BAD_PARAM);
            return;
        }

        var arriveTime = arriveHour + ':' + arriveMinute;

        var jsonBody = {
            'telegramID':telegramID,
            'canteenName':canteenName,
            'waitingTime':waitingTime,
            'arriveTime':arriveTime
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'PUT',
            body: jsonBody,
            json:true
        };

        request(options, function(error, response, body) {
            if(!error && response.statusCode === 200) {
                //controllo parametro errore sul json
                if(body.error === false) {
                    resolve(true);
                    return;
                }
            }
            reject(REQ_FAIL);
            return;
        });
    });
}

/* EXPORT OF FUNCTIONS */
module.exports = {
    waitingTimeCanteen: waitingTimeCanteen,
    bestWaitingTime: bestWaitingTime,
    addWaitingTime: addWaitingTime
};