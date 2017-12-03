var MEASURE = require('../MeasureDBHelper');
var MeasureEntity = require('../../entities/MeasureEntity.js');
measure = new MEASURE();

//DEFINING MEASURE ENTITY
var measureEntity = new MeasureEntity(null, "300", "2", "2017-12-03 12:00:00", "500");

//TESTING
//addMeasures				
test('addMeasure(null, "300", "2", "2017-12-03 12:00:00", "500")', () =>{
	expect.assertions(1);
	return expect(measure.addMeasure(measureEntity)).resolves.toEqual();
});

//parseMeasure
/*
test('getLastMeasure()', () =>{
	expect.assertions(1);
	measureEntity.measureId = measure.getLastMeasure().measureId;
	return expect(measure.getLastMeasure()).resolves.toEqual(measureEntity);
});
*/

//deleteLastMeasure
test('deleteLastMeasure('+measureEntity.measureId+')', () =>{
	expect.assertions(1);
	return expect(measure.deleteLastMeasure(measureEntity.measureId)).resolves.toEqual();
});