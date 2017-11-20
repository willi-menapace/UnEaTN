module.exports = class ApplicationHandlerSkeleton {
    constructor(preprocessor) {
        this.preprocessor = preprocessor;
    }
    
    dispatch(req, res) {
        var self = this;
        this.preprocessor.parseAndValidate(req).then(function(attributes) {
            self.processRequest(res, attributes);
        }, function(err) {
            self.processParseOfValidationFailure(res, err);
        });
    }
    
    processParseOfValidationFailure(res, errorDescription) {
        // METHOD WILL BE OVERRIDED IN SUBCLASSES
    }
    
    processRequest(res, attributes) {
        // METHOD WILL BE OVERRIDED IN SUBCLASSES
    }
    
}

