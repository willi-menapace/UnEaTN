/*
* Node.js module that is a stub for the unEATn RESTful API
* Listen for HTTP request and sends a stub response
* Used to test the client side API
*
* Author: Giuliani Daniele
*/

var PORT = 8080;
var DEBUG = false;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var httpServer = require('http').createServer(app);

app.use(bodyParser.json()); //for parsing application/json


app.get('/api/waitingTimeCanteen', function (req, res) {
    var jsonRequest = req.body;
    var jsonResponse;

    if(DEBUG) {
        console.log('GET /api/waitingTimeCanteen');
        console.log('------------ REQUEST ------------');
        console.log(jsonRequest);
    }

    //sets error as default
    jsonResponse = {
        'error':true,
        'errorDescription':'description of the error'
    };

    if(jsonRequest.hasOwnProperty('canteenName')) {
        if(jsonRequest.canteenName.localeCompare('testOK') === 0) {   //setted value for passing the test
            jsonResponse = {
                'error':false,
                'waitingTime':11
            };
        }
    }

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});


app.get('/api/bestWaitingTime', function (req, res) {
    var jsonRequest = req.body;
    var jsonResponse;

    if(DEBUG) {
        console.log('GET /api/bestWaitingTime');
        console.log('------------ REQUEST ------------');
        console.log(jsonRequest);
    }

    jsonResponse = {
        'error':true,
        'errorDescription':'description of the error'
    };

    if(jsonRequest.hasOwnProperty('startTime')) {
        if(jsonRequest.startTime.localeCompare('99:99') === 0) {   //setted value for passing the test
            jsonResponse = {
                'error':false,
                'bestWaitingTimes':
                    [
                        {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                        {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                        {'name':'povo0', 'error':true, 'values':{'bestTime':null, 'waitingTime':null}}
                    ]
            };
        }
    }

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});


app.put('/addWaitingTime', function (req, res) {
    var jsonRequest = req.body;
    var jsonResponse;

    if(DEBUG) {
        console.log('PUT /addWaitingTime');
        console.log('------------ REQUEST ------------');
        console.log(jsonRequest);
    }

    jsonResponse = {
        'error':true,
        'errorDescription':'description of the error'
    };


    if(jsonRequest.hasOwnProperty('canteenName')) {
        if(jsonRequest.canteenName.localeCompare('testOK') === 0) {   //setted value for passing the test
            jsonResponse = {
                'error':false
            };
        }
    }

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});

function start(port, debugMode) {
    PORT = port;
    DEBUG = debugMode;
    httpServer.listen(PORT);
    if(DEBUG) {
        console.log('Listening on port: ' + PORT);
    }
}

function stop() {
    httpServer.close();
}


module.exports = {
    start:start,
    stop:stop
};