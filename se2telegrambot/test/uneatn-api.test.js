/*
* Module for the testing of the RESTful API access library (uneatn-api.js)
*
* Author: Giuliani Daniele
*/
const HOST = 'http://localhost';
const PORT = 8080;

var UNEATN = require('../uneatn-api');
var STUB_SERVER = require('./api-stub-replier');


/* Setup stub server replier */
beforeAll(function() {
    UNEATN.overrideServerAPI(HOST + ':' + PORT); //set localhost as request handler
    STUB_SERVER.start(PORT, false);
});


/* getCanteenList() test cases */
var responseArray = ['povo0', 'povo1', 'pastoLesto', 'testOK', 'testNO'];
test('getCanteenList()', function() {
    expect.assertions(1);
    return expect(UNEATN.getCanteenList()).resolves.toEqual(responseArray);
});

test('getCanteenList(123, \'useless\', \'parameters\')', function() {
    expect.assertions(1);
    return expect(UNEATN.getCanteenList(123, 'useless', 'parameters')).resolves.toEqual(responseArray);
});

/* getWaitTime() test cases */

test('getWaitTime(\'testOK\', 12, 30, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.getWaitTime('testOK', 12, 30, 3)).resolves.toBe(11);
});

test('getWaitTime(\'testNO\', 12, 30, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.getWaitTime('testNO', 12, 30, 3)).rejects.toBe(UNEATN.NO_PREVISION);
});

test('getWaitTime()', function() {
    expect.assertions(1);
    return expect(UNEATN.getWaitTime()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('getWaitTime(\'testOK\', \'abbas\', \'are great\')', function() {
    expect.assertions(1);
    return expect(UNEATN.getWaitTime('testOK', 'abbas', 'are', 'great')).rejects.toBe(UNEATN.BAD_PARAM);
});


/* getBestTime() test cases */

var positiveResponse = {
    'bestTime':
        [
            {'codeName':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
            {'codeName':'povo0', 'isClosed':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
            {'codeName':'povo0', 'isClosed':true, 'values':{'bestTime':null, 'waitingTime':null}}
        ]
};

test('getBestTime(99, 99, 13, 0, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.getBestTime(11, 11, 13, 0, 3)).resolves.toEqual(positiveResponse);
});

test('getBestTime(12, 30, 13, 0, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.getBestTime(12, 30, 13, 0, 3)).rejects.toBe(UNEATN.REQ_FAIL);
});

test('getBestTime()', function() {
    expect.assertions(1);
    return expect(UNEATN.getBestTime()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('getBestTime(\'a\', \'l\', \'l\', \'a\', \'h\')', function() {
    expect.assertions(1);
    return expect(UNEATN.getBestTime('a', 'l', 'l', 'a', 'h')).rejects.toBe(UNEATN.BAD_PARAM);
});


/* addTime() test cases */

test('addTime(\'tokenOK\', 12345, \'testOK\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addTime('tokenOK', 12345, 'testOK', 99, 99, 99)).resolves.toBe(true);
});

test('addTime()', function() {
    expect.assertions(1);
    return expect(UNEATN.addTime()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('addTime(\'tokenOK\', 12345, \'testOK\', \'ok\', \'boh\', \'no\')', function() {
    expect.assertions(1);
    return expect(UNEATN.addTime( 'tokenOK', '12345', 'testOK', 'ok', 'boh', 'no')).rejects.toBe(UNEATN.BAD_PARAM);
});

test('addTime(\'tokenNO\', 123, \'povo0\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addTime('tokenNO', 123, 'povo0', 99, 99, 99)).rejects.toBe(UNEATN.REQ_FAIL);
});

test('addTime(\'tokenOK\', \'randomID\', \'testOK\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addTime('tokenOK', 'randomID', 'testOK', 99, 99, 99)).rejects.toBe(UNEATN.BAD_PARAM);
});



/* Shutdown stub server replier */
afterAll(function() {
    STUB_SERVER.stop();
});