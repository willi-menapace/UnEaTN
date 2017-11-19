module.exports = class ApplicationHandlerSkeleton {
    constructor(preprocessor) {
        this.preprocessor = preprocessor;
    }
    
    dispatch(req, res) {
        var attributes = this.preprocessor.parseAndValidate(req);
        if(attributes.getError() == true) {
            this.processParseOfValidationFailure(res, attributes.getErrorDescription());
        } else {
            this.processRequest(res, attributes);
        }
    }
    
    processParseOfValidationFailure(res, errorDescription) {
        // METHOD WILL BE OVERRIDED IN SUBCLASSES
    }
    
    processRequest(res, attributes) {
        // METHOD WILL BE OVERRIDED IN SUBCLASSES
    }
    
}

