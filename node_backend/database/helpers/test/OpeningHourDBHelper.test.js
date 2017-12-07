var OPENINGHOUR = require('../OpeningHourDBHelper');
var OpeningHourEntity = require('../../entities/OpeningHourEntity.js');
openingHour = new OPENINGHOUR();

//DEFINING OPENINGHOUR ENTITY
var openingHourEntity = [];
openingHourEntity[0] = new OpeningHourEntity(5, 1, 4, "11:45:00", "14:30:00");
openingHourEntity[1] = new OpeningHourEntity(10, 2, 3, "11:45:00", "14:30:00");


//TESTING
//getOpeningHourByCanteenIdAndDay				
test('getOpeningHourByCanteenIdAndDay(1, 4)', () =>{
	expect.assertions(1);
	return expect(openingHour.getOpeningHourByCanteenIdAndDay(1, 4)).resolves.toEqual(openingHourEntity[0]);
});

test('getOpeningHourByCanteenIdAndDay(2, 3)', () =>{
	expect.assertions(1);
	return expect(openingHour.getOpeningHourByCanteenIdAndDay(2, 3)).resolves.toEqual(openingHourEntity[1]);
});

test('getOpeningHourByCanteenIdAndDay(4, 2)', () =>{
	expect.assertions(1);
	return expect(openingHour.getOpeningHourByCanteenIdAndDay(4, 2)).resolves.toEqual(null);
});

//getOpeningHoursByCanteenId
test('getOpeningHoursByCanteenId(1)', () =>{
	expect.assertions(1);
	var expectedArray = [];
	expectedArray[0] = new OpeningHourEntity(1, 1, 0, "11:45:00", "14:30:00");
	expectedArray[1] = new OpeningHourEntity(2, 1, 1, "11:45:00", "14:30:00");
	expectedArray[2] = new OpeningHourEntity(3, 1, 2, "11:45:00", "14:30:00");
	expectedArray[3] = new OpeningHourEntity(4, 1, 3, "11:45:00", "14:30:00");
	expectedArray[4] = new OpeningHourEntity(5, 1, 4, "11:45:00", "14:30:00");
	expectedArray[5] = new OpeningHourEntity(6, 1, 5, "11:45:00", "14:30:00");
	expectedArray[6] = null;
	var expected = [
						expectedArray[0],
						expectedArray[1],
						expectedArray[2],
						expectedArray[3],
						expectedArray[4],
						expectedArray[5],
						expectedArray[6]
					];
	return expect(openingHour.getOpeningHoursByCanteenId(1)).resolves.toEqual(expected);
});


test('getOpeningHoursByCanteenId(5)', () =>{
	expect.assertions(1);
	return expect(openingHour.getOpeningHoursByCanteenId(5)).resolves.toEqual([]);
});



