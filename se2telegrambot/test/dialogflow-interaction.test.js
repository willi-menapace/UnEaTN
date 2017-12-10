/*
* Modulo di testing per il modulo di interazione con Dialogflow (dialogflow-interaction.js)
*
* Author: Lorenzo Chini
*/

const HOST = 'http://localhost';
const PORT = 8081;

var UNEATN = require('../uneatn-api');
var STUB_SERVER = require('./api-stub-replier-df');
var DF_INTERACTION = require('../dialogflow-interaction');

/* Setup stub server replier */
beforeAll(function() {
    UNEATN.overrideServerAPI(HOST + ':' + PORT+'/'); //set localhost as request handler
    STUB_SERVER.start(PORT, false);
});

var defaultWaitTimeAnswer = 'Dovrai aspettare in coda circa 30 minuti.';

var defaultBestTimeAnswer = 'lesto: ti consiglio di andare a mangiare alle 12:00, dovrai aspettare circa 15 minuti.\n';
defaultBestTimeAnswer += 'povo0: ti consiglio di andare a mangiare alle 12:20, dovrai aspettare circa 14 minuti.\n';
defaultBestTimeAnswer += 'povo1: non ho trovato nessun orario.\n';

var msg1={
    'text':'Quanta coda è prevista a Povo 0 domani?', //errore voluto sull'orario
    'chat':{
        'id':'randomId1'
    }
};

var msg2={
    'text':'Quanta coda è prevista al Pasto Lesto?',
    'chat':{
        'id':'randomId2'
    }
};

var msg3={
    'text':'Quanta coda è prevista a Povo2 domani alle 13:15?', //errore voluto sulla mensa
    'chat':{
        'id':'randomId3'
    }
};

var msg4={
    'text':'Quali sono le previsioni per la coda lunedì alle 12:30 a povo 1?',
    'chat':{
        'id':'randomId4'
    }
};

var msg5={
    'text':'Dimmi le previsioni per domani alle 14 al Pasto Lesto',
    'chat':{
        'id':'randomId5'
    }
};

var msg6={
    'text':'Quanta coda è prevista al Pasto Lesto domenica alle 13:15?',
    'chat':{
        'id':'randomId6'
    }
};

var msg7={
    'text':'Qual è il momento migliore per andare a mangiare domani tra le 12 e le 13:30?',
    'chat':{
        'id':'randomId7'
    }
};

var msg8={
    'text':'Quando è meglio che vada a pranzare tra le 12 e le 14?',
    'chat':{
        'id':'randomId8'
    }
};

var msg9={
    'text': 'rip',
    'chat':{
        'id':'randomId9'
    }
};

var msg10={
    'text': '  ', //Non può mai accadere, Telegram non permette di inviare messaggi vuoti!
    'chat':{
        'id':'randomId10'
    }
};

var msg11={
    'text':'Qual è il momento migliore per andare a mangiare?',
    'chat':{
        'id':'randomId11'
    }
};

test('dateToDayofTheWeek(2017,11,28)', function() {
    expect(DF_INTERACTION.dateToDayofTheWeek(2017,11,28)).toBe(1);
});

test('dateParser(0)', function() {
    expect(DF_INTERACTION.dateParser(0)).toBe(null);
});

test('dateParser(null)', function() {
    expect(DF_INTERACTION.dateParser(null)).toBe(null);
});

test('dateParser()', function() {
    expect(DF_INTERACTION.dateParser()).toBe(null);
});

test('dateParser(\'\')', function() {
    expect(DF_INTERACTION.dateParser('')).toBe(null);
});

test('dateParser(\'testString\')', function() {
    expect(DF_INTERACTION.dateParser('testString')).toBe(null);
});

test('dateParser(\'2017-04-11\')', function() {
   expect(DF_INTERACTION.dateParser('2017-04-11')).toBe(DF_INTERACTION.dateToDayofTheWeek(2017,4,11));
});

test('timestampParser(\'\',\'d\')', function() {
   expect(DF_INTERACTION.timestampParser('','d')).toBe(null);
});

test('timestampParser(null,\'d\')', function() {
    expect(DF_INTERACTION.timestampParser(null,'d')).toBe(null);
});

test('timestampParser(\'testString\',\'d\')', function() {
    expect(DF_INTERACTION.timestampParser('testString','d')).toBe(null);
});

test('timestampParser(\'1996-10-02T03:54:04.7Z\',\'d\')', function() {
    expect(DF_INTERACTION.timestampParser('1996-10-02T03:54:04.7Z','d')).toEqual([1996,10,2]);
});

test('timestampParser(\'2017-11-19T03:20:43.1Z\',\'t\')', function() {
    expect(DF_INTERACTION.timestampParser('2017-11-19T03:20:43.1Z','t')).toEqual([4,20]); //Ricordo che la TIME ZONE è +1
});

test('timestampParser(\'1996-10-02T03:54:14.7Z\',\'a\')', function() {
    expect(DF_INTERACTION.timestampParser('1996-10-02T03:54:14.7Z','a')).toEqual([1996,10,2,4,54,14]);
});

test('timestampParser(\'1996-10-02T03:54:14.7Z\')', function() {
    expect(DF_INTERACTION.timestampParser('1996-10-02T03:54:14.7Z')).toEqual([1996,10,2,4,54,14]);
});

test('timestampParser(\'1996-10-02T03:54:14.7Z\',\'j\')', function() {
    expect(DF_INTERACTION.timestampParser('1996-10-02T03:54:14.7Z','j')).toBe(null);
});

test('timeParser(0)', function() {
    expect(DF_INTERACTION.timeParser(0)).toBe(null);
});

test('timeParser()', function() {
   expect(DF_INTERACTION.timeParser()).toBe(null);
});

test('timeParser(\'\')', function() {
    expect(DF_INTERACTION.timeParser('')).toBe(null);
});

test('timeParser(null)', function() {
    expect(DF_INTERACTION.timeParser(null)).toBe(null);
});

test('timeParser(\'testString\')', function() {
    expect(DF_INTERACTION.timeParser('testString')).toBe(null);
});

test('timeParser(\'19:07:06\')', function() {
    expect(DF_INTERACTION.timeParser('19:07:06')).toEqual([19,7]);
});

test('timeParser(\'19:07:06\',\'uselessParameter\')', function() {
    expect(DF_INTERACTION.timeParser('19:07:06','uselessParameter')).toEqual([19,7]);
});

test('1)TESTING: '+msg1.text, function() {
    var testPromise1 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg1,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise1).rejects.toBe(DF_INTERACTION.NO_TIME_ERROR);
});

test('2)TESTING: '+msg2.text, function() {
    var testPromise2 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg2,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise2).resolves.toBe(defaultWaitTimeAnswer);
});

test('3)TESTING: '+msg3.text, function() {
    var testPromise3 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg3,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise3).rejects.toBe(DF_INTERACTION.NO_CANTEEN_ERROR);
});

test('4)TESTING: '+msg4.text, function() {
    var testPromise4 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg4,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise4).rejects.toBe(DF_INTERACTION.CANTEEN_CLOSED);
});

test('5)TESTING: '+msg5.text, function() {
    var testPromise5 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg5,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise5).resolves.toBe(defaultWaitTimeAnswer);
});

test('6)TESTING: '+msg6.text, function() {
    var testPromise6 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg6,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise6).resolves.toBe(defaultWaitTimeAnswer);
});

test('7)TESTING: '+msg7.text, function() {
    var testPromise7 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg7,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise7).resolves.toBe(defaultBestTimeAnswer);
});

test('8)TESTING: '+msg8.text, function() {
    var testPromise8 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg8,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise8).resolves.toBe(defaultBestTimeAnswer);
});

test('9)TESTING: '+msg9.text, function() {
    var testPromise9 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg9,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise9).rejects.toBe(DF_INTERACTION.NOT_RECOGNIZED_INTENT);
});

test('10)TESTING: '+msg10.text, function() {
    var testPromise10 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg10,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise10).rejects.toBe(DF_INTERACTION.DIALOGFLOW_INTERNAL_ERROR);
});

test('11)TESTING: '+msg11.text, function() {
    var testPromise11 = new Promise(function (resolve,reject) {
        DF_INTERACTION.NLrequestParser(msg11,resolve,reject);
    });
    expect.assertions(1);
    return expect(testPromise11).rejects.toBe(DF_INTERACTION.NO_TIME_INTERVAL_ERROR);
});

/* Shutdown stub server replier */
afterAll(function() {
    STUB_SERVER.stop();
});
