class QRAttributes {
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
}

module.exports = class QRPreprocessor {
    
    contructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var qrAttributes = new QRAttributes();
        
            resolve(qrAttributes);    
        } 
        return new Promise(promiseFunction); 
    }
}