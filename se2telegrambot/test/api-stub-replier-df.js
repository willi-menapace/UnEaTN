/**
 *  Modulo node che fa da stub replier server per il testing del modulo dialogflow-interaction.
 *
 *  Author: Lorenzo Chini (in stile con l'api-stub-replier di Daniele Giuliani)
 */


var PORT = 8081;
var DEBUG = true;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var httpServer = require('http').createServer(app);

app.use(bodyParser.json()); //for parsing application/json

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
        'waitingTime':null
    };

    if(reqParam.hasOwnProperty('codeName')) {
        if(reqParam.codeName.localeCompare('lesto') === 0) {
            jsonResponse = {
                'isClosed':false,
                'waitingTime':30
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
        if(reqParam.startTime.localeCompare('12:0') === 0) {   //setted value for passing the test
            jsonResponse = {
                'bestTime':
                    [
                        {'codeName':'lesto', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
                        {'codeName':'povo0', 'isClosed':false, 'values':{'bestTime':'12:20', 'waitingTime':14}},
                        {'codeName':'povo1', 'isClosed':true, 'values':{'bestTime':null, 'waitingTime':null}}
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