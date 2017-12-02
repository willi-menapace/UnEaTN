var enumify = require('enumify');
var TimeHelper = require('../../common/TimeHelper.js');

class Days extends enumify.Enum {};
Days.initEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);

class HomePageAttributes {
    constructor(day, requestDate) {
        this.day = day;
        this.requestDate = requestDate;
    }
    getDay() {
        return this.day;
    }
    setDay(day) {
        this.day = day;
    }
    getRequestDate() {
        return this.requestDate;
    }
    setRequestDate(requestDate) {
        this.requestDate = requestDate;
    }
}

module.exports = class HomePagePreprocessor {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var promiseFunction = function(resolve, reject) {
            var homePageAttributes = null;
            var requestDate = new Date();
            var weekDay;
            
            // If today is SUNDAY
            if(requestDate.getDay() == 0)
                weekDay = Days.SUNDAY.ordinal;
            else
                weekDay = requestDate.getDay()-1;
            
            homePageAttributes = new HomePageAttributes(weekDay, requestDate);
        
            resolve(homePageAttributes);    
        }  
        return new Promise(promiseFunction);
    }
    
}