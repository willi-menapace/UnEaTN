var Jext = require('jest');
var httpMocks = require('node-mocks-http');
var Error = require('../../common/Error.js');
var ErrorType = require('../../common/ErrorType.js');
var HttpStatus = require('../../common/HttpStatus.js')
var BestWaitingTimeCanteenPreprocessor = require('./BestWaitingTimePreprocessor.js');




//*****************************************************************************
//
//                  BestWaitingTimeCanteenPreprocessor
//
//*****************************************************************************

var bestWaitingTimeCanteenPreprocessor = new BestWaitingTimeCanteenPreprocessor();
//*********************************************************************************************************************************************************************
//TEST 1:
//Request url and attributes
var request1 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '0',
        startTime: '12:00',
        endTime: '13:00'
    }
});
//creation of Data Object
var startTimeAttribute1 = new Date();
startTimeAttribute1.setHours(12);
startTimeAttribute1.setMinutes(0);
startTimeAttribute1.setSeconds(0);
startTimeAttribute1.setMilliseconds(0);

var endTimeAttribute1 = new Date();
endTimeAttribute1.setHours(13);
endTimeAttribute1.setMinutes(0);
endTimeAttribute1.setSeconds(0);
endTimeAttribute1.setMilliseconds(0);

//creation of the output object 
bestWaitingTimeCanteenAttributes = {
    day: 0,
    startDate: startTimeAttribute1,
    endDate: endTimeAttribute1
}

test('test1-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request1)).resolves.toMatchObject(bestWaitingTimeCanteenAttributes);
});

//*********************************************************************************************************************************************************************
//TEST 2:
//Request url and attributes
var request2 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '1234',
        startTime: '12:00',
        endTime: '13:00'
    }
});

var error2 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);
test('test2-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request2)).rejects.toMatchObject(error2);
});

//*********************************************************************************************************************************************************************
//TEST 3:
//Request url and attributes
var request3 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        startTime: '12:00',
        endTime: '13:00'
    }
});

var error3 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);
test('test3-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request3)).rejects.toMatchObject(error3);
});

//*********************************************************************************************************************************************************************
//TEST 4:
//Request url and attributes
var request4 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '1',
        startTime: '12:00asdf',
        endTime: '13:00'
    }
});

var error4 = new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR);
test('test4-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request4)).rejects.toMatchObject(error4);
});
//*********************************************************************************************************************************************************************
//TEST 5:
//Request url and attributes
var request5 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '1',
        endTime: '13:00'
    }
});

var error5 = new Error(HttpStatus.BAD_REQUEST, ErrorType.START_TIME_ERROR);
test('test5-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request5)).rejects.toMatchObject(error5);
});
//*********************************************************************************************************************************************************************
//TEST 6:
//Request url and attributes
var request6 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '1',
        startTime: '12:00',
        endTime: '13:00ASDF'
    }
});

var error6 = new Error(HttpStatus.BAD_REQUEST, ErrorType.END_TIME_ERROR);
test('test6-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request6)).rejects.toMatchObject(error6);
});
//*********************************************************************************************************************************************************************
//TEST 7:
//Request url and attributes
var request7 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '1',
        startTime: '12:00'
    }
});

var error7 = new Error(HttpStatus.BAD_REQUEST, ErrorType.END_TIME_ERROR);
test('test7-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request7)).rejects.toMatchObject(error7);
});

//*********************************************************************************************************************************************************************
//TEST 8:
//Request url and attributes
var request8 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/bestTime?day=0&startTime=12:00&endTime=13:00',
    query: {
        day: '-1',
        startTime: '12:00',
        endTime: '13:00'
    }
});

var error8 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);
test('test8-BestWaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(bestWaitingTimeCanteenPreprocessor.parseAndValidate(request8)).rejects.toMatchObject(error8);
});

