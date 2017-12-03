var Jext = require('jest');
var httpMocks = require('node-mocks-http');
var Error = require('../../common/Error.js');
var ErrorType = require('../../common/ErrorType.js');
var HttpStatus = require('../../common/HttpStatus.js')
var WaitingTimeCanteenPreprocessor = require('./WaitingTimeCanteenPreprocessor.js');




//*****************************************************************************
//
//                  WaitingTimeCanteenPreprocessor
//
//*****************************************************************************


var waitingTimeCanteenPreprocessor = new WaitingTimeCanteenPreprocessor();

//*********************************************************************************************************************************************************************
//TEST 1:
//Request url and attributes
var request1 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '2',
        codeName: 'lesto',
        time: '12:00'
    }
});
//creation of Data Object
var timeAttribute1 = new Date();
timeAttribute1.setHours(12);
timeAttribute1.setMinutes(0);
timeAttribute1.setSeconds(0);
timeAttribute1.setMilliseconds(0);

//creation of the output object 
waitingTimeCanteenAttributes = {
    canteen: {
        canteenId: 1,
        codeName: "lesto",
        name: "Pasto lesto"
   },
    day: 2,
    time: timeAttribute1
}

test('test1-WaitingTimeCanteenPreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request1)).resolves.toMatchObject(waitingTimeCanteenAttributes);
});


//*********************************************************************************************************************************************************************
//TEST 2:
//Request url andattributes
var request2 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '2',
        codeName: 'lestoa',
        time: '12:00'
    }
});

//creation of the output object 
var error2 = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

test('test2-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request2)).rejects.toMatchObject(error2);
});

//*********************************************************************************************************************************************************************
//TEST 3:
//Request url andattributes
var request3 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '22345',
        codeName: 'lesto',
        time: '12:00'
    }
});

//creation of the output object 
var error3 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);

test('test3-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request3)).rejects.toMatchObject(error3);
});

//*********************************************************************************************************************************************************************
//TEST 4:
//Request url andattributes
var request4 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '2',
        codeName: 'lesto',
        time: '12:00asdf'
    }
});

//creation of the output object 
var error4 = new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR);

test('test4-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request4)).rejects.toMatchObject(error4);
});
//*********************************************************************************************************************************************************************
//TEST 5:
//Request url andattributes
var request5 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        codeName: 'lesto',
        time: '12:00'
    }
});

//creation of the output object 
var error5 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);

test('test5-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request5)).rejects.toMatchObject(error5);
});
//*********************************************************************************************************************************************************************
//TEST 6:
//Request url andattributes
var request6 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '2',
        time: '12:00'
    }
});

//creation of the output object 
var error6 = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

test('test6-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request6)).rejects.toMatchObject(error6);
});
//*********************************************************************************************************************************************************************
//TEST 7:
//Request url andattributes
var request7 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '2',
        codeName: 'lesto'
    }
});

//creation of the output object 
var error7 = new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR);

test('test7-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request7)).rejects.toMatchObject(error7);
});

//*********************************************************************************************************************************************************************
//TEST 8:
//Request url andattributes
var request8 = httpMocks.createRequest({
    method: 'GET',
    url: 'http://localhost:8080/api/v1/waitTime?day=2&codeName=lesto&time=12:00',
    query: {
        day: '-1',
        codeName: 'lesto',
        time :'12:00'
    }
});

//creation of the output object 
var error8 = new Error(HttpStatus.BAD_REQUEST, ErrorType.DAY_ERROR);

test('test8-WaitingTimeCanteenPreprocessor-parseAndValidate' + waitingTimeCanteenAttributes.toString(), () => {
    expect.assertions(1);
    return expect(waitingTimeCanteenPreprocessor.parseAndValidate(request8)).rejects.toMatchObject(error8);
});





