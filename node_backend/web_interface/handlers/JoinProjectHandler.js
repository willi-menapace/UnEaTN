var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var JoinProjectPreprocessor = require('../preprocessors/JoinProjectPreprocessor.js');
var bind = require('bind');

module.exports = class JoinProjectHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new JoinProjectPreprocessor();
        super(preprocessor);
    }
    
    processParseOfValidationFailure(res, errorDescription) {
        res.status(500);
        res.end(errorDescription);
    }
    
    processRequest(res, joinProjectAttributes) {
        
        bind.toFile('./node_backend/web_interface/tpl/joinProject.tpl', {
            // NOTHING TO PASS
        }, function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    }
}
