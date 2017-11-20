var enumify = require('enumify');

class WaitingTimeWeeklyAttributes {
    constructor(canteenId) {
        this.canteenId = canteenId;    
    }
    getCanteenId() {
        return this.canteenId;
    }
    setCanteenId(canteenId) {
        this.canteenId = canteenId;
    }
}

class Canteens extends enumify.Enum {};
Canteens.initEnum({
    PASTO_LESTO: {
        id: 1,
    },
    POVO_0: {
        id: 2,
    },
    POVO_1: {
        id: 3,
    },
});

module.exports = class WaitingTimeDailyPreprocessor {
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var waitingTimeWeeklyAttributes = null;
            var canteenId = null;
            var canteenIdAttribute = parseInt(req.query.canteenId);

            // If canteen id which is passed by front-end is null then PASTO_LESTO will be set
            if(typeof canteenIdAttribute === 'undefined' || canteenIdAttribute === null || isNaN(canteenIdAttribute)) {
                canteenIdAttribute = Canteens.PASTO_LESTO.id;
            }

            switch(canteenIdAttribute) {
                case Canteens.PASTO_LESTO.id:
                    canteenId = Canteens.PASTO_LESTO.id;
                    break;
                case Canteens.POVO_0.id:
                    canteenId = Canteens.POVO_0.id;
                    break;
                case Canteens.POVO_1.id:
                    canteenId = Canteens.POVO_1.id;
                    break;
            }

            canteenId = canteenIdAttribute;

            waitingTimeWeeklyAttributes = new WaitingTimeWeeklyAttributes(canteenId);

            if(canteenId === null) {
                var errorDescription = "Invalid canteen";
                reject(errorDescription);
            }

            resolve(waitingTimeWeeklyAttributes);
        }   
        
        return new Promise(promiseFunction);
    }
        
}