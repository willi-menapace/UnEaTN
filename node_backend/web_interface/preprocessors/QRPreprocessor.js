var Attributes = require('../../common/Attributes.js');

class QRAttributes extends Attributes {
    constructor() {
        super();
    }
}

module.exports = class QRPreprocessor {
    
    contructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var qrAttributes = new QRAttributes();
        
        return qrAttributes;
    }
}