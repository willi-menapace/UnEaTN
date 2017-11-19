var Attributes = require('../../common/Attributes.js');

class JoinProjectAttributes extends Attributes {
    constructor() {
        super();
    }
}

module.exports = class JoinProjectPreprocessor {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var joinProjectAttributes = new JoinProjectAttributes();
        
        return joinProjectAttributes;
    }
}