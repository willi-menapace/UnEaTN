class HomePageAttributes {
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
}

module.exports = class HomePagePreprocessor {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    parseAndValidate(req) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var homePageAttributes = new HomePageAttributes();
        
            resolve(homePageAttributes);    
        }  
        return new Promise(promiseFunction);
    }
}