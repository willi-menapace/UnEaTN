var PREVISION = require('../PrevisionDBHelper');
var PrevisionEntity = require('../../entities/PrevisionEntity.js');
prevision = new PREVISION();

//DEFINING PREVISIONDATA ENTITY
var previsionEntity = [];
var time = new Date(2017, 10, 29, 24, 0, 0, 0)
previsionEntity[0] = new PrevisionEntity(137, 10, time);

//TESTING
//getLatestPrevisionByCanteenIdAndDay				
test('getPrevisionByCanteenIdAndDay(2, 3)', () =>{
	expect.assertions(1);
	return expect(prevision. getLatestPrevisionByCanteenIdAndDay(2, 3)).resolves.toEqual(previsionEntity[0]);
});
			
test('getPrevisionByCanteenIdAndDay(6, 2)', () =>{
	expect.assertions(1);
	return expect(prevision. getLatestPrevisionByCanteenIdAndDay(6, 2)).resolves.toEqual(null);
});
