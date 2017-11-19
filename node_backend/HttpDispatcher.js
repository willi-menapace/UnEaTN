var express = require('express');
var HomePageHandler = require('./web_interface/handlers/HomePageHandler.js');
var QRHandler = require('./web_interface/handlers/QRHandler.js');
var JoinProjectHandler = require('./web_interface/handlers/JoinProjectHandler.js');
var WaitingTimeDailyHandler = require('./web_interface/handlers/WaitingTimeDailyHandler.js');
var WaitingTimeWeeklyHandler = require('./web_interface/handlers/WaitingTimeWeeklyHandler.js');
var AddWaitingTimeHandler = require('./telegram_bot/handlers/AddWaitingTimeHandler');
var BestWaitingTimeHandler = require('./api/handlers/BestWaitingTimeHandler')
var bodyParser = require('body-parser');
var DatabaseHelper = require('./database/helpers/DatabaseHelper.js');


// Instantiate express
var app = express();

app.use(bodyParser.json());

//handle requests on /
app.get('/', function (req, res) {
    var homePageHandler = new HomePageHandler();
    homePageHandler.dispatch(req, res);
});

//handle requests on /qr
app.get('/qr', function (req, res) {
    var qrHandler = new QRHandler();
    qrHandler.dispatch(req, res);
});

//handle requests on /joinProject
app.get('/joinProject', function (req, res) {
    var joinProjectHandler = new JoinProjectHandler();
    joinProjectHandler.dispatch(req, res);
});

//handle requests on /compChart
app.get('/compChart', function (req, res) {
    var waitingTimeDailyHandler = new WaitingTimeDailyHandler();
    waitingTimeDailyHandler.dispatch(req, res);
});

//handle requests on /weekChart
app.get('/weekChart', function (req, res) {
    var waitingTimeWeeklyHandler = new WaitingTimeWeeklyHandler();
    waitingTimeWeeklyHandler.dispatch(req, res);
});

//handle requests on /webcam
app.get('/webcam', function (req, res) {

});

//handle requests on /api/addWaitingTime
app.put('/addWaitingTime', function (req, res) {
    var addWaitingTimeHandler = new AddWaitingTimeHandler();
    addWaitingTimeHandler.dispatch(req,res);
});

//handle requests on /api/bestWaitingTime
app.get('/api/bestWaitingTime', function (req, res) {
    var bestWaitingTimeHandler = new BestWaitingTimeHandler();
    bestWaitingTimeHandler.dispatch(req,res);
});

//handle requests on /api/waitingTimeCanteen
app.get('/api/waitingTimeCanteen', function (req, res) {

});

//handle requests on /api/ranking
app.get('/ranking', function (req, res) {

});

//listen in a specific port
app.listen((process.env.PORT || 8080));

//check status
console.log('Server running at http://localhost:8080/');