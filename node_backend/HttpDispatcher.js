var express = require('express');
var HomePageHandler = require('./web_interface/handlers/HomePageHandler.js');
var QRHandler = require('./web_interface/handlers/QRHandler.js');
var JoinProjectHandler = require('./web_interface/handlers/JoinProjectHandler.js');
var WaitingTimeDailyHandler = require('./web_interface/handlers/WaitingTimeDailyHandler.js');
var WaitingTimeWeeklyHandler = require('./web_interface/handlers/WaitingTimeWeeklyHandler.js');
var BestTimeHandler = require('./web_interface/handlers/BestTimeHandler.js');
var AddWaitingTimeHandler = require('./telegram_bot/handlers/AddWaitingTimeHandler.js');
var BestWaitingTimeHandler = require('./api/handlers/BestWaitingTimeHandler.js');
var WaitingTimeCanteenHandler = require('./api/handlers/WaitingTimeCanteenHandler.js');
var CodeNamesHandler = require('./api/handlers/CodeNamesHandler.js');
var Error = require('./common/Error.js');
var HttpStatus = require('./common/HttpStatus.js');
var ErrorType = require('./common/ErrorType.js');
var bodyParser = require('body-parser');
var bind = require('bind');

// Instantiate express
var app = express();

app.use(express.static('./node_backend/web_interface/static'));

app.use(bodyParser.json());

//catch sintax request error
app.use(function(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400) {
        res.status(err.status).send(ErrorType.SYNTAX_REQUEST_ERROR.errorDescription);
    }   
});

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

//handle requests on /bestTime
app.get('/bestTime', function (req, res) {
    var bestTimeHandler = new BestTimeHandler();
    bestTimeHandler.dispatch(req, res);
});

//handle requests on /api/addWaitingTime
app.post('/addTime', function (req, res) {
    var addWaitingTimeHandler = new AddWaitingTimeHandler();
    addWaitingTimeHandler.dispatch(req,res);
});

//handle requests on /api/bestWaitingTime
app.get('/api/v1/bestTime', function (req, res) {
    var bestWaitingTimeHandler = new BestWaitingTimeHandler();
    bestWaitingTimeHandler.dispatch(req,res);
});

//handle requests on /api/waitingTimeCanteen
app.get('/api/v1/waitTime', function (req, res) {
    var waitingTimeCanteenHandler = new WaitingTimeCanteenHandler();
    waitingTimeCanteenHandler.dispatch(req,res);
});

app.get('/api/v1/codeName', function(req, res){
    var codeNamesHandler = new CodeNamesHandler();
    codeNamesHandler.dispatch(req, res);
    
});

//handle other requests
app.all('*', function (req, res) {
    var error = new Error(HttpStatus.NOT_FOUND, ErrorType.URL_ERROR);
    var errorStatus = error.statusType.status;
    var errorDescription = error.descriptionType.errorDescription;
    
    bind.toFile('./node_backend/web_interface/tpl/error.tpl', {
        errorStatus: errorStatus,
        errorDescription: errorDescription
    }, function(data) {
        res.writeHead(errorStatus, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

//listen in a specific port
app.listen((process.env.PORT || 8080));

//check status
console.log('Server running at http://localhost:8080/');