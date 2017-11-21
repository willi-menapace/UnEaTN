/*
* Node.js module for accessing the unEATn RESTful API
* Handles HTTP request and response, hiding all the implementation details
* All the method return a promise, that will be resolved if the request gets
* executed successfully, otherwise the promise will be rejected with an error message
*
* Author: Giuliani Daniele
*/

var URL_UNEATN = 'http://localhost:8080'; //todo set correct default url

var request = require('request');

/* ERROR MESSAGES */
const MISSING_PARAM = "Missing parameters!";
const BAD_PARAM = "Bad parameters!";
const REQ_FAIL = "Request failed!";

/*
* Method for querying the waiting time of a specific canteen in a certain moment
* Returns a promise containing:
*   waitingTime - if promise was resolved succesfully (will be null if no time is available)
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
                    resolve(body.waitingTime);
                    return;
                } else {
                    reject(body.errorDescription);
                    return;
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
*   A json object with this pattern:
*       {
*           'error':false,
            'bestWaitingTimes':
                [
                    {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                    {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                    {'name':'povo0', 'error':true, 'values':{'bestTime':null, 'waitingTime':null}}
                ]
*       }
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
                    resolve(body);
                    return;
                } else {
                    reject(body.errorDescription);
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
        if(isNaN(telegramID) || isNaN(waitingTime) || isNaN(arriveHour) || isNaN(arriveMinute)) {
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
                } else {
                    reject(body.errorDescription);
                    return;
                }
            }
            reject(REQ_FAIL);
            return;
        });
    });
}

/*
* Method used to set another URL for the api server
* should never be used exept for testing purposes
* return:
*   true - update succesfull
*   fale - update failed
*/
function overrideServerAPI(url) {
    if(url !== undefined) {
        URL_UNEATN = url;
        return true;
    }
    return false;
}

/* EXPORT OF FUNCTIONS */
module.exports = {
    //function
    waitingTimeCanteen: waitingTimeCanteen,
    bestWaitingTime: bestWaitingTime,
    addWaitingTime: addWaitingTime,
    //error messages
    MISSING_PARAM: MISSING_PARAM,
    BAD_PARAM: BAD_PARAM,
    REQ_FAIL: REQ_FAIL,
    //testing function
    overrideServerAPI: overrideServerAPI
};