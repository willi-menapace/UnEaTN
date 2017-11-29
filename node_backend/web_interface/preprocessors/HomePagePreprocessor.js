var enumify = require('enumify');

class Days extends enumify.Enum {};
Days.initEnum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']);

class HomePageAttributes {
    constructor(day) {
        this.day = day;    
    }
    getDay() {
        return this.day;
    }
    setDay(day) {
        this.day = day;
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
            
            homePageAttributes = new HomePageAttributes(weekDay);
        
            resolve(homePageAttributes);    
        }  
        return new Promise(promiseFunction);
    }
    
}