var pool = require('../../database/helpers/pool.js');
var httpMocks = require('node-mocks-http');
var Error = require('../../common/Error.js');
var ErrorType = require('../../common/ErrorType.js');
var HttpStatus = require('../../common/HttpStatus.js')
var AddWaitingTimePreprocessor = require('./AddWaitingTimePreprocessor.js');




//*****************************************************************************
//
//                  BestWaitingTimeCanteenPreprocessor
//
//*****************************************************************************

var addWaitingTimePreprocessor = new AddWaitingTimePreprocessor();

//*********************************************************************************************************************************************************************
//TEST 1:
//Request url and attributes
var request1 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});
//creation of Data Object
var arriveTimeAttribute1 = new Date();
arriveTimeAttribute1.setHours(13);
arriveTimeAttribute1.setMinutes(30);
arriveTimeAttribute1.setSeconds(0);
arriveTimeAttribute1.setMilliseconds(0);

//creation of the output object 
var addWaitingTimeAttributes1 = {
    canteen: {
        canteenId: 1,
        codeName: "lesto",
        name: "Pasto lesto"
    },
    waitingTime: 10,
    arriveTime: arriveTimeAttribute1
}


test('test1-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request1)).resolves.toMatchObject(addWaitingTimeAttributes1);
});
//*********************************************************************************************************************************************************************
//TEST 2:
//Request url and attributes
var request2 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)d",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error2 = new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR);

test('test2-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request2)).rejects.toMatchObject(error2);
});
//*********************************************************************************************************************************************************************
//TEST 3:
//Request url and attributes
var request3 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error3 = new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR);

test('test3-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request3)).rejects.toMatchObject(error3);
});
//*********************************************************************************************************************************************************************
//TEST 4:
//Request url and attributes
var request4 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: 32,
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error4 = new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR);

test('test4-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request4)).rejects.toMatchObject(error4);
});
//*********************************************************************************************************************************************************************
//TEST 5:
//Request url and attributes
var request5 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: "0",
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error5 = new Error(HttpStatus.BAD_REQUEST, ErrorType.TELEGRAM_ID_ERROR);

test('test5-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request5)).rejects.toMatchObject(error5);
});

//*********************************************************************************************************************************************************************
//TEST 6:
//Request url and attributes
var request6 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error6 = new Error(HttpStatus.PERMISSION_DENIED, ErrorType.AUTHENTICATION_ERROR);

test('test6-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request4)).rejects.toMatchObject(error6);
});
//*********************************************************************************************************************************************************************
//TEST 7:
//Request url and attributes
var request5 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        codeName: "lesto",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error7 = new Error(HttpStatus.BAD_REQUEST, ErrorType.TELEGRAM_ID_ERROR);

test('test7-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request5)).rejects.toMatchObject(error7);
});
//*********************************************************************************************************************************************************************
//TEST 8:
//Request url and attributes
var request8 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lestoA",
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error8 = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

test('test8-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request8)).rejects.toMatchObject(error8);
});
//*********************************************************************************************************************************************************************
//TEST 9:
//Request url and attributes
var request9 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: 32,
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error9 = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

test('test9-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request9)).rejects.toMatchObject(error9);
});
//*********************************************************************************************************************************************************************
//TEST 10:
//Request url and attributes
var request10 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        waitingTime: 10,
        arriveTime: "13:30"
    }
});

var error10 = new Error(HttpStatus.BAD_REQUEST, ErrorType.CANTEEN_ERROR);

test('test10-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request10)).rejects.toMatchObject(error10);
});
//*********************************************************************************************************************************************************************
//TEST 11:
//Request url and attributes
var request11 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: "asdf",
        arriveTime: "13:30"
    }
});

var error11 = new Error(HttpStatus.BAD_REQUEST, ErrorType.WAITING_TIME_ERROR);

test('test11-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request11)).rejects.toMatchObject(error11);
});
//*********************************************************************************************************************************************************************
//TEST 12:
//Request url and attributes
var request12 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        arriveTime: "13:30"
    }
});

var error12 = new Error(HttpStatus.BAD_REQUEST, ErrorType.WAITING_TIME_ERROR);

test('test12-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request12)).rejects.toMatchObject(error12);
});
//*********************************************************************************************************************************************************************
//TEST 13:
//Request url and attributes
var request13 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 30,
        arriveTime: "13:30ASDF"
    }
});

var error13 = new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR);

test('test13-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request13)).rejects.toMatchObject(error13);
});
//*********************************************************************************************************************************************************************
//TEST 14:
//Request url and attributes
var request14 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 30,
        arriveTime: 21
    }
});

var error14 = new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR);

test('test14-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request14)).rejects.toMatchObject(error14);
});

//*********************************************************************************************************************************************************************
//TEST 15:
//Request url and attributes
var request15 = httpMocks.createRequest({
    method: 'POST',
    url: 'http://localhost:8080/addTime',
    //
    body: {
        authToken: "]VsM°O&>KIc{=qdZP8({qVZlExK8yN;bXYE}EWMa{Ptg|.#%zk1q4kkgu!pPBC)tr)",
        telegramId: 0,
        codeName: "lesto",
        waitingTime: 30,
    }
});

var error15 = new Error(HttpStatus.BAD_REQUEST, ErrorType.ARRIVE_TIME_ERROR);

test('test15-AddWaitingTimePreprocessor-parseAndValidate', () => {
    expect.assertions(1);
    return expect(addWaitingTimePreprocessor.parseAndValidate(request15)).rejects.toMatchObject(error15);
});

afterAll(() => {
  pool.end();
});

