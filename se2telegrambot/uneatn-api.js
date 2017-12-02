/*
* Node.js module for accessing the unEATn RESTful API
* Handles HTTP request and response, hiding all the implementation details
* All the method return a promise, that will be resolved if the request gets
* executed successfully, otherwise the promise will be rejected with an error message
*
* Author: Giuliani Daniele
*/

var URL_UNEATN = process.env.UNEATN_URL || 'http://localhost:8080'; //second url is used for testing purpuses only

var request = require('request');

/* ERROR MESSAGES */
const MISSING_PARAM = 'Missing parameters!';
const BAD_PARAM = 'Bad parameters!';
const REQ_FAIL = 'Request failed!';
const NO_PREVISION = 'The canteen is closed!';
const BAD_DATA = 'Submitted data is not valid!';

/*
* Method for fetching the list of available canteen codenames
* Returns a promise containing:
*   an array of codenames - if request was completed succesfully
*   error message - otherwise
*/
function getCanteenList() {
    const URL_POSTFIX = '/api/v1/codeName';
    return new Promise(function(resolve, reject) {
        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'GET'
        };

        request(options, function(error, response, body) {
            if(!error) {
                if(response.statusCode === 200) {
                    var jsonBody = JSON.parse(body);
                    resolve(jsonBody.codeName);
                    return;
                }
                console.log('UNEATN-API: response status code: ' + response.statusCode + '\n');
                reject(REQ_FAIL);
                return;
            }
            reject(REQ_FAIL);
            return;
        });
    });
}

/*
* Method for querying the waiting time of a specific canteen in a certain moment
* Returns a promise containing:
*   waitingTime - if promise was resolved succesfully (will be null if no time is available)
*   error message - if promise was rejected
*/
function getWaitTime(canteenName, hour, minute, dayOfTheWeek) {
    const URL_POSTFIX = '/api/v1/waitTime';

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

        var propertiesObject = {
            'codeName':canteenName,
            'time':time,
            'day':dayOfTheWeek
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'GET',
            qs: propertiesObject
        };

        request(options, function(error, response, body) {
            if(!error) {
                if(response.statusCode === 200) {
                    var jsonBody = JSON.parse(body);
                    if(jsonBody.isClosed === false) {
                        resolve(jsonBody.waitingTime);
                        return;
                    } else {
                        reject(NO_PREVISION);
                        return;
                    }
                }
                console.log('UNEATN-API: response status code: ' + response.statusCode + '\n');
                reject(REQ_FAIL);
                return;
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
            'bestWaitingTimes':
                [
                    {'name':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                    {'name':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                    {'name':'povo0', 'isClosed':true, 'values':{'bestTime':null, 'waitingTime':null}}
                ]
*       }
*       if the promise was resolved succesfully
*   error message - if promise was rejected
*/
function getBestTime(startHour, startMinute, endHour, endMinute, dayOfTheWeek) {
    const URL_POSTFIX = '/api/v1/bestTime';

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

        var propertiesObject = {
            'startTime':startTime,
            'endTime':endTime,
            'day':dayOfTheWeek
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'GET',
            qs: propertiesObject
        };

        request(options, function(error, response, body) {
            if(!error) {
                if(response.statusCode === 200) {
                    var jsonBody = JSON.parse(body);
                    resolve(jsonBody);
                    return;
                }
                console.log('UNEATN-API: response status code: ' + response.statusCode + '\n');
                reject(REQ_FAIL);
                return;
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
function addTime(authToken, telegramID, canteenName, waitingTime, arriveHour, arriveMinute) {
    const URL_POSTFIX = '/addTime';

    return new Promise(function(resolve, reject) {
        if(authToken === undefined || telegramID === undefined || canteenName === undefined || waitingTime === undefined || arriveHour === undefined || arriveMinute === undefined) {
            reject(MISSING_PARAM);
            return;
        }
        if(isNaN(telegramID) || isNaN(waitingTime) || isNaN(arriveHour) || isNaN(arriveMinute)) {
            reject(BAD_PARAM);
            return;
        }

        var arriveTime = arriveHour + ':' + arriveMinute;

        var jsonBody = {
            'authToken':authToken,
            'telegramId':telegramID,
            'codeName':canteenName,
            'waitingTime':waitingTime,
            'arriveTime':arriveTime
        };

        var options = {
            uri: URL_UNEATN + URL_POSTFIX,
            method: 'POST',
            body: jsonBody,
            json:true
        };

        request(options, function(error, response, body) {
            if(!error) {
                if(response.statusCode === 200) {
                    if(body.isClosed === false) {
                        resolve(true);
                        return;
                    }
                    reject(BAD_DATA);
                    return;
                }
                console.log('UNEATN-API: response status code: ' + response.statusCode + '\n');
                reject(REQ_FAIL);
                return;
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
    getCanteenList: getCanteenList,
    getWaitTime: getWaitTime,
    getBestTime: getBestTime,
    addTime: addTime,
    //error messages
    MISSING_PARAM: MISSING_PARAM,
    BAD_PARAM: BAD_PARAM,
    REQ_FAIL: REQ_FAIL,
    NO_PREVISION: NO_PREVISION,
    BAD_DATA: BAD_DATA,
    //testing function
    overrideServerAPI: overrideServerAPI
};