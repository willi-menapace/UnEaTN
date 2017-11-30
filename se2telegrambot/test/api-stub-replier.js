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

app.get('/api/v1/codeName', function(req, res) {
    if(DEBUG) {
        console.log('GET /api/v1/codeName');
    }

    jsonResponse = {
        'codeName':['povo0', 'povo1', 'pastoLesto', 'testOK', 'testNO']
    };

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});

app.get('/api/v1/waitTime', function (req, res) {
    var reqParam = req.query;
    var jsonResponse;

    if(DEBUG) {
        console.log('GET /api/v1/waitTime');
        console.log('------------ REQUEST ------------');
        console.log(reqParam);
    }

    //sets error as default
    jsonResponse = {
        'isClosed':true,
        'waitTime':null
    };

    if(reqParam.hasOwnProperty('codeName')) {
        if(reqParam.codeName.localeCompare('testOK') === 0) {   //setted value for passing the test
            jsonResponse = {
                'isClosed':false,
                'waitTime':11
            };
        }
    }

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});


app.get('/api/v1/bestTime', function (req, res) {
    var reqParam = req.query;
    var jsonResponse;

    if(DEBUG) {
        console.log('GET /api/v1/bestTime');
        console.log('------------ REQUEST ------------');
        console.log(reqParam);
    }

    jsonResponse = {};
    res.statusCode = 550;

    if(reqParam.hasOwnProperty('startTime')) {
        if(reqParam.startTime.localeCompare('99:99') === 0) {   //setted value for passing the test
            jsonResponse = {
                'bestTime':
                    [
                        {'name':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                        {'name':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                        {'name':'povo0', 'isClosed':true, 'values':{'bestTime':null, 'waitingTime':null}}
                    ]
            };
            res.statusCode = 200;
        }
    }

    if(DEBUG) {
        console.log('------------ RESPONSE ------------');
        console.log(jsonResponse);
    }

    res.json(jsonResponse);
});


app.post('/addTime', function (req, res) {
    var jsonRequest = req.body;
    var jsonResponse;

    if(DEBUG) {
        console.log('POST /addTime');
        console.log('------------ REQUEST ------------');
        console.log(jsonRequest);
    }

    jsonResponse = {};
    res.statusCode = 550;


    if(jsonRequest.hasOwnProperty('authToken')) {
        if(jsonRequest.authToken.localeCompare('tokenOK') === 0) {   //setted value for passing the test
            res.statusCode = 200;
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