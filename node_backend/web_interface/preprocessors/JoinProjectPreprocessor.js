class JoinProjectAttributes {
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
}

module.exports = class JoinProjectPreprocessor {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var promiseFunction = function(resolve, reject) {
            var joinProjectAttributes = new JoinProjectAttributes();
            
            resolve(joinProjectAttributes);
        }
        return new Promise(promiseFunction);
    }
    
}