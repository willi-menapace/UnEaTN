/*
* This module contains different utility function for converting string to various
* data types with the apporpiate controls.
*
* Author: Giuliani Daniele
*/


/*
* Method to check the validity of a canteen string
* returns true if the string is a valid canteen, false otherwise
*/
exports.isCanteenValid = function(canteen, canteenList) {
    if(canteen === undefined || canteenList === undefined) return false;

    for(var i = 0; i < canteenList.length; i++) {
        if(canteen.localeCompare(canteenList[i]) === 0) {
            return true;
        }
    }
    return false;
};

/*
* Method to check the validity of a time string (HH:MM or HH.MM)
* returns an object containing the variables minute, hour if the time is valid, null otherwise
*/
exports.parseTime = function(time) {
    if(time === undefined) return null;

    var hourRE = /^([0-9]+)[:.][0-9]+$/;
    var minuteRE = /^[0-9]+[:.]([0-9]+)$/;

    var tHour = hourRE.exec(time);
    var tMinute = minuteRE.exec(time);

    if(tHour === null || tMinute === null) {
        return null;
    }

    var hour = parseInt(tHour[1]);
    var minute = parseInt(tMinute[1]);

    if(!isNaN(hour) && !isNaN(minute)) {
        if(hour < 24 && hour >= 0 && minute < 60 && minute >= 0) {
            return {hour:hour, minute:minute};
        }
    }

    return null;
};

/*
* Method to check the validity of a date string
* returns the day of the week (0 sunday, 6 saturday) given a valid string, null otherwise
*/
exports.parseDate = function(dateString) {
    switch(dateString) {
        case '1':
        case 'lun':
            return 0;
        case '2':
        case 'mar':
            return 1;
        case '3':
        case 'mer':
            return 2;
        case '4':
        case 'gio':
            return 3;
        case '5':
        case 'ven':
            return 4;
        case '6':
        case 'sab':
            return 5;
        case '7':
        case 'dom':
            return 6;
        default:
            return null;
    }
};