var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');
var TimeHelper = require('../../common/TimeHelper.js');
var httpMocks = require('node-mocks-http');
var BestTimePreprocessor = require('../preprocessors/BestTimePreprocessor.js');
var HomePagePreprocessor = require('../preprocessors/HomePagePreprocessor.js');
var WaitingTimeDailyPreprocessor = require('../preprocessors/WaitingTimeDailyPreprocessor.js');
var WaitingTimeWeeklyPreprocessor = require('../preprocessors/WaitingTimeWeeklyPreprocessor.js');

// Different types of errors
var dayError = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);
var startTimeError = new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR);
var endTimeError = new Error(HttpStatus.BAD_REQUEST, ErrorType.END_TIME_ERROR);
var canteenError = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

/*
* TEST CODE FOR BEST TIME PREPROCESSOR
*/
var bestTimeFirstRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/bestTime'
});

var bestTimeRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/bestTime?day=0&startTime=12:00&endTime=12:30',
    query: {
        day: '0',
        startTime: '12:00',
        endTime: '12:30'
    }
});

var bestTimeWrongDayRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/bestTime?startTime=12:00&endTime=12:30',
    query: {
        startTime: '12:00',
        endTime: '12:30'
    }
});

var bestTimeWrongStartTimeRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/bestTime?day=0&endTime=12:30',
    query: {
        day: '0',
        endTime: '12:30'
    }
});

var bestTimeWrongEndTimeRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/bestTime?day=0&startTime=12:00',
    query: {
        day: '0',
        startTime: '12:00'
    }
});

var bestTimePreprocessor = new BestTimePreprocessor();

var bestTimeAttributesFirstRequest = {
    isFirstRequest: true,
    day: null,
    startDate: null,
    endDate: null
};

var bestTimeAttributes = {
    isFirstRequest: false,
    day: 0,
    startDate: TimeHelper.getDateByTime('12:00'),
    endDate: TimeHelper.getDateByTime('12:30')
};

test('test1-BestTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestTimePreprocessor.parseAndValidate(bestTimeFirstRequest)).resolves.toMatchObject(bestTimeAttributesFirstRequest);
});
test('test2-BestTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestTimePreprocessor.parseAndValidate(bestTimeRequest)).resolves.toMatchObject(bestTimeAttributes);
});
test('test3-BestTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestTimePreprocessor.parseAndValidate(bestTimeWrongDayRequest)).rejects.toMatchObject(dayError);
});
test('test4-BestTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestTimePreprocessor.parseAndValidate(bestTimeWrongStartTimeRequest)).rejects.toMatchObject(startTimeError);
});
test('test5-BestTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestTimePreprocessor.parseAndValidate(bestTimeWrongEndTimeRequest)).rejects.toMatchObject(endTimeError);
});

/*
* TEST CODE FOR HOME PAGE PREPROCESSOR
*/
var HomePageRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/'
});

var homePagePreprocessor = new HomePagePreprocessor();
var todayDate = TimeHelper.getDateByTime(TimeHelper.getTimeByDate(new Date()));
var weekDay = null;

if(todayDate.getDay() == 0) {
    weekDay = 6;
} else {
    weekDay = todayDate.getDay() - 1;
}

var homePageAttributes = {
    day: weekDay,
    requestDate: todayDate
};

test('test1-HomePagePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(homePagePreprocessor.parseAndValidate(HomePageRequest)).resolves.toMatchObject(homePageAttributes);
});

/*
* TEST CODE FOR QR PREPROCESSOR
*/

/*
* TEST CODE FOR JOIN PROJECT PREPROCESSOR
*/

/*
* TEST CODE FOR WAITING TIME DAILY PREPROCESSOR
*/
var waitingTimeDailyFirstRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/compChart'
});

var waitingTimeDailyRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/compChart?day=0',
    query: {
        day: '0'
    }
});

var waitingTimeDailyWrongDayRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/compChart?day=7',
    query: {
        day: '7'
    }
});

var waitingTimeDailyPreprocessor = new WaitingTimeDailyPreprocessor();
var todayDate = TimeHelper.getDateByTime(TimeHelper.getTimeByDate(new Date()));
var weekDay = null;

if(todayDate.getDay() == 0) {
    weekDay = 6;
} else {
    weekDay = todayDate.getDay() - 1;
}

var waitingTimeDailyAttributesFirstRequest = {
    day: weekDay
};

var waitingTimeDailyAttributes = {
    day: 0
};

test('test1-WaitingTimeDailyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeDailyPreprocessor.parseAndValidate(waitingTimeDailyFirstRequest)).resolves.toMatchObject(waitingTimeDailyAttributesFirstRequest);
});
test('test2-WaitingTimeDailyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeDailyPreprocessor.parseAndValidate(waitingTimeDailyRequest)).resolves.toMatchObject(waitingTimeDailyAttributes);
});
test('test3-WaitingTimeDailyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeDailyPreprocessor.parseAndValidate(waitingTimeDailyWrongDayRequest)).rejects.toMatchObject(dayError);
});

/*
* TEST CODE FOR WAITING TIME WEEKLY PREPROCESSOR
*/
var waitingTimeWeeklyFirstRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/weekChart'
});

var waitingTimeWeeklyRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/weekChart?canteenId=2',
    query: {
        canteenId: '2'
    }
});

var waitingTimeWeeklyWrongCanteenRequest = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/weekChart?canteenId=0',
    query: {
        canteenId: '0'
    }
});

var waitingTimeWeeklyPreprocessor = new WaitingTimeWeeklyPreprocessor();

var waitingTimeWeeklyAttributesFirstRequest = {
    canteenId: 1
};

var waitingTimeWeeklyAttributes = {
    canteenId: 2
};

test('test1-WaitingTimeWeeklyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeWeeklyPreprocessor.parseAndValidate(waitingTimeWeeklyFirstRequest)).resolves.toMatchObject(waitingTimeWeeklyAttributesFirstRequest);
});
test('test2-WaitingTimeWeeklyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeWeeklyPreprocessor.parseAndValidate(waitingTimeWeeklyRequest)).resolves.toMatchObject(waitingTimeWeeklyAttributes);
});
test('test3-WaitingTimeWeeklyPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeWeeklyPreprocessor.parseAndValidate(waitingTimeWeeklyWrongCanteenRequest)).rejects.toMatchObject(canteenError);
});
