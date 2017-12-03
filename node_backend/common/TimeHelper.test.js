var TimeHelper = require('./TimeHelper.js');
var PrevisionDataEntity = require('../database/entities/PrevisionDataEntity.js');
var OpeningHourEntity = require('../database/entities/OpeningHourEntity.js');

/*
* TEST CODE FOR TIMEHELPER
*/

/*
* TEST CODE FOR GET DATE BY TIME
*/ 
var testTime1 = '12:30:00';
var testDate1 = new Date();
testDate1.setHours(12);
testDate1.setMinutes(30);
testDate1.setSeconds(0);
testDate1.setMilliseconds(0);

test('test1-TimeHelper-getDateByTime', () => {
  expect(TimeHelper.getDateByTime(testTime1)).toEqual(testDate1);
});

/*
* TEST CODE FOR GET TIME BY DATE
*/
var testTime2 = '12:30';
var testDate2 = new Date();
testDate2.setHours(12);
testDate2.setMinutes(30);
testDate2.setSeconds(10);
testDate2.setMilliseconds(10);

test('test1-TimeHelper-getDateByTime', () => {
  expect(TimeHelper.getTimeByDate(testDate2)).toEqual(testTime2);
});

/*
* TEST CODE FOR ADD MINUTES
*/
var testTime3 = '12:30:00';
var testDate3 = TimeHelper.getDateByTime(testTime3);
var testTime4 = '12:40:00';
var testDate4 = TimeHelper.getDateByTime(testTime4);
var testTime5 = '12:39:00';
var testDate5 = TimeHelper.getDateByTime(testTime5);

test('test1-TimeHelper-addMinutes', () => {
  expect(TimeHelper.addMinutes(testDate3, 10)).toEqual(testDate4);
});
test('test2-TimeHelper-addMinutes', () => {
  expect(TimeHelper.addMinutes(testDate3, 10)).not.toEqual(testDate5);
});

/*
* TEST CODE FOR GET PREVISION DATA BY TIME
*/
var previsions = [];
var previsionData1 = new PrevisionDataEntity(1, 1, '11:45:00', 0);
var previsionData2 = new PrevisionDataEntity(2, 1, '11:46:00', 56);
var previsionData3 = new PrevisionDataEntity(3, 1, '11:47:00', 140);
var previsionData4 = new PrevisionDataEntity(4, 1, '11:48:00', 222);
var previsionData5 = new PrevisionDataEntity(5, 1, '11:49:00', 301);
var dateTimeTarget = TimeHelper.getDateByTime('11:47:00');
previsions.push(previsionData1);
previsions.push(previsionData2);
previsions.push(previsionData3);
previsions.push(previsionData4);
previsions.push(previsionData5);


test('test1-TimeHelper-getPrevisionDataByTime', () => {
  expect(TimeHelper.getPrevisionDataByTime(previsions, dateTimeTarget)).toEqual(previsionData3);
});

/*
* TEST CODE FOR GET MIN OPEN DATE TIME
*/
var openingHours = [];
var openingHour1 = new OpeningHourEntity(1, 1, 0, '11:45:00', '14:32:00');
var openingHour2 = new OpeningHourEntity(2, 2, 0, '11:44:00', '14:29:00');
var openingHour3 = new OpeningHourEntity(3, 3, 0, '11:46:00', '14:31:00');
var openingHour4 = new OpeningHourEntity(4, 4, 0, '11:43:00', '14:28:00');
var openingHour5 = new OpeningHourEntity(5, 5, 0, '11:46:00', '14:32:00');
openingHours.push(openingHour1);
openingHours.push(openingHour2);
openingHours.push(openingHour3);
openingHours.push(openingHour4);
openingHours.push(openingHour5);
var minOpenDateTime = TimeHelper.getDateByTime('11:43:00');

test('test1-TimeHelper-getMinOpenDateTime', () => {
  expect(TimeHelper.getMinOpenDateTime(openingHours)).toEqual(minOpenDateTime);
});

/*
* TEST CODE FOR GET MAX CLOSE TIME
*/
var maxCloseDateTime = TimeHelper.getDateByTime('14:32:00');

test('test1-TimeHelper-getMaxCloseDateTime', () => {
  expect(TimeHelper.getMaxCloseDateTime(openingHours)).toEqual(maxCloseDateTime);
});
