/*
* Testing case for the utilites.js file, use 'npm test' to execute
*
* Author: Giuliani Daniele
*/

const util = require('../utilities');

/*
* isCanteenValid() testing
*/
testList = ['test1', 'test2'];

test('isCanteenValid(\'test\', testList)', function() {
   expect(util.isCanteenValid('test', testList)).toBe(false);
});
test('isCanteenValid(\'test1\', testList)', function() {
    expect(util.isCanteenValid('test1', testList)).toBe(true);
});
test('isCanteenValid(\'test\')', function() {
    expect(util.isCanteenValid('test')).toBe(false);
});
test('isCanteenValid(testList)', function() {
    expect(util.isCanteenValid(testList)).toBe(false);
});
test('isCanteenValid()', function() {
    expect(util.isCanteenValid()).toBe(false);
});

/*
* parseTime() testing
*/
test('parseTime():', function() {
    expect(util.parseTime()).toBe(null);
});
test('parseTime(\'12.20\')', function() {
    expect(util.parseTime('12.20')).toEqual({hour:12, minute:20});
});
test('parseTime(\'12:20\')', function() {
    expect(util.parseTime('12:20')).toEqual({hour:12, minute:20});
});
test('parseTime(\'23.59\')', function() {
    expect(util.parseTime('23.59')).toEqual({hour:23, minute:59});
});
test('parseTime(\'00.00\')', function() {
    expect(util.parseTime('00.00')).toEqual({hour:0, minute:0});
});
test('parseTime(\'21.00\')', function() {
    expect(util.parseTime('24.00')).toBe(null);
});
test('parseTime(\'24:05\')', function() {
    expect(util.parseTime('24:05')).toBe(null);
});
test('parseTime(\'11.61\')', function() {
    expect(util.parseTime('11.61')).toBe(null);
});
test('parseTime(\'11:61\')', function() {
    expect(util.parseTime('11:61')).toBe(null);
});
test('parseTime(\'26.15\')', function() {
    expect(util.parseTime('26.15')).toBe(null);
});
test('parseTime(\'26.15\')', function() {
    expect(util.parseTime('26:15')).toBe(null);
});
test('parseTime(\'test.61\')', function() {
    expect(util.parseTime('test.61')).toBe(null);
});
test('parseTime(\'12:61\')', function() {
    expect(util.parseTime('12:61')).toBe(null);
});

/*
* parseDate() testing
*/
test('parseDate()', function() {
    expect(util.parseDate()).toBe(null);
});
test('parseDate(\'\')', function() {
    expect(util.parseDate('')).toBe(null);
});
test('parseDate(\'ostheoporosis\')', function() {
    expect(util.parseDate('ostheoporosis')).toBe(null);
});
test('parseDate(\'1\')', function() {
    expect(util.parseDate('1')).toBe(0);
});
test('parseDate(\'lun\')', function() {
    expect(util.parseDate('lun')).toBe(0);
});
test('parseDate(\'2\')', function() {
    expect(util.parseDate('2')).toBe(1);
});
test('parseDate(\'mar\')', function() {
    expect(util.parseDate('mar')).toBe(1);
});
test('parseDate(\'3\')', function() {
    expect(util.parseDate('3')).toBe(2);
});
test('parseDate(\'mer\')', function() {
    expect(util.parseDate('mer')).toBe(2);
});
test('parseDate(\'4\')', function() {
    expect(util.parseDate('4')).toBe(3);
});
test('parseDate(\'gio\')', function() {
    expect(util.parseDate('gio')).toBe(3);
});
test('parseDate(\'5\')', function() {
    expect(util.parseDate('5')).toBe(4);
});
test('parseDate(\'ven\')', function() {
    expect(util.parseDate('ven')).toBe(4);
});
test('parseDate(\'6\')', function() {
    expect(util.parseDate('6')).toBe(5);
});
test('parseDate(\'sab\')', function() {
    expect(util.parseDate('sab')).toBe(5);
});
test('parseDate(\'7\')', function() {
    expect(util.parseDate('7')).toBe(6);
});
test('parseDate(\'dom\')', function() {
    expect(util.parseDate('dom')).toBe(6);
});