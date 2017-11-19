var Attributes = require('../../common/Attributes.js');

class HomePageAttributes extends Attributes {
    constructor() {
        super();
    }
}

module.exports = class HomePagePreprocessor {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var homePageAttributes = new HomePageAttributes();
        
        return homePageAttributes;
    }
}