var enumify = require('enumify');
var Attributes = require('../../common/Attributes.js');

class WaitingTimeWeeklyAttributes extends Attributes {
    constructor(canteenId) {
        super();
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
        var waitingTimeWeeklyAttributes = null;
        var canteenId = null;
        var canteenIdAttribute = req.params.canteenId;
        
        // If canteen id which is passed by front-end is null then PASTO_LESTO will be set
        if(canteenIdAttribute === null) {
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
            default:
        }
        
        waitingTimeWeeklyAttributes = new WaitingTimeWeeklyAttributes(canteenId);
        
        if(canteenId === null) {
            var errorDescription = "Invalid canteen";
            waitingTimeWeeklyAttributes.setError(true);
            waitingTimeWeeklyAttributes.setErrorDescription(errorDescription);
        }
        F
        return waitingTimeWeeklyAttributes;
    }
}