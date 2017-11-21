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



/* waitingTimeCanteen() test cases */

test('waitingTimeCanteen(\'testOK\', 12, 30, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.waitingTimeCanteen('testOK', 12, 30, 3)).resolves.toBe(11);
});

test('waitingTimeCanteen(\'testNO\', 12, 30, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.waitingTimeCanteen('testNO', 12, 30, 3)).rejects.toBe('description of the error');
});

test('waitingTimeCanteen()', function() {
    expect.assertions(1);
    return expect(UNEATN.waitingTimeCanteen()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('waitingTimeCanteen(\'testOK\', \'abbas\', \'are great\')', function() {
    expect.assertions(1);
    return expect(UNEATN.waitingTimeCanteen('testOK', 'abbas', 'are', 'great')).rejects.toBe(UNEATN.BAD_PARAM);
});


/* bestWaitingTime() test cases */

var positiveResponse = {
    'error':false,
    'bestWaitingTimes':
        [
            {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
            {'name':'povo0', 'error':false, 'values':{'bestTime':'12:00', 'waitingTime':15}},
            {'name':'povo0', 'error':true, 'values':{'bestTime':null, 'waitingTime':null}}
        ]
};

test('bestWaitingTime(99, 99, 13, 0, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.bestWaitingTime(99, 99, 13, 0, 3)).resolves.toEqual(positiveResponse);
});

test('bestWaitingTime(12, 30, 13, 0, 3)', function() {
    expect.assertions(1);
    return expect(UNEATN.bestWaitingTime(12, 30, 13, 0, 3)).rejects.toBe('description of the error');
});

test('bestWaitingTime()', function() {
    expect.assertions(1);
    return expect(UNEATN.bestWaitingTime()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('bestWaitingTime(\'a\', \'l\', \'l\', \'a\', \'h\')', function() {
    expect.assertions(1);
    return expect(UNEATN.bestWaitingTime('a', 'l', 'l', 'a', 'h')).rejects.toBe(UNEATN.BAD_PARAM);
});


/* addWaitingTime() test cases */

test('addWaitingTime(12345, \'testOK\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addWaitingTime(12345, 'testOK', 99, 99, 99)).resolves.toBe(true);
});

test('addWaitingTime()', function() {
    expect.assertions(1);
    return expect(UNEATN.addWaitingTime()).rejects.toBe(UNEATN.MISSING_PARAM);
});

test('addWaitingTime(12345, \'testOK\', \'99\', \'99\', \'99\')', function() {
    expect.assertions(1);
    return expect(UNEATN.addWaitingTime('12345', 'testOK', 'ok', 'boh', 'no')).rejects.toBe(UNEATN.BAD_PARAM);
});

test('addWaitingTime(123, \'testNO\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addWaitingTime(123, 'testNO', 99, 99, 99)).rejects.toBe('description of the error');
});

test('addWaitingTime(\'randomID\', \'testOK\', 99, 99, 99)', function() {
    expect.assertions(1);
    return expect(UNEATN.addWaitingTime('randomID', 'testOK', 99, 99, 99)).rejects.toBe(UNEATN.BAD_PARAM);
});



/* Shutdown stub server replier */
afterAll(function() {
    STUB_SERVER.stop();
});