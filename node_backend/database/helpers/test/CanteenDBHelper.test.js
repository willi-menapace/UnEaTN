var CANTEEN = require('../CanteenDBHelper');
var CanteenEntity = require('../../entities/CanteenEntity.js');
canteen = new CANTEEN();

//DEFINING CANTEEN ENTITY
var canteenEntity = [];
canteenEntity[0] = new CanteenEntity(1, "Pasto lesto", "lesto");
canteenEntity[1] = new CanteenEntity(2, "Povo 0", "povo0");
canteenEntity[2] = new CanteenEntity(3, "Povo 1", "povo1");

//DEFINING getAllCanteens EXPECT
var canteenArray = [
						canteenEntity[0],
						canteenEntity[1],
						canteenEntity[2]
					];

//TESTING
//getAllCanteens				
test('getAllCanteens()', () =>{
	expect.assertions(1);
	return expect(canteen.getAllCanteens()).resolves.toEqual(canteenArray);
});

//getCanteenById
test('getCanteenById(1)', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenById(1)).resolves.toEqual(canteenEntity[0]);
});

test('getCanteenById(3)', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenById(3)).resolves.toEqual(canteenEntity[2]);
});

test('getCanteenById(5)', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenById(5)).resolves.toEqual(null);
});

//getCanteenByCodeName
test('getCanteenByCodeName("lesto")', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenByCodeName("lesto")).resolves.toEqual(canteenEntity[0]);
});

test('getCanteenByCodeName("povo0")', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenByCodeName("povo0")).resolves.toEqual(canteenEntity[1]);
});

test('getCanteenByCodeName("povo2")', () =>{
	expect.assertions(1);
	return expect(canteen.getCanteenByCodeName("povo2")).resolves.toEqual(null);
});

//getNumberOfCanteens
test('getNumberOfCanteens()', () =>{
	expect.assertions(1);
	return expect(canteen.getNumberOfCanteens()).resolves.toEqual(3);
});



