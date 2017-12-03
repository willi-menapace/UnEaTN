var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var JoinProjectPreprocessor = require('../preprocessors/JoinProjectPreprocessor.js');
var HttpStatus = require('../../common/HttpStatus.js');
var bind = require('bind');

module.exports = class JoinProjectHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new JoinProjectPreprocessor();
        super(preprocessor);
    }
    
    processFailure(res, err) {
        var errorStatus = err.statusType.status;
        var errorDescription = err.descriptionType.errorDescription;
        bind.toFile('./node_backend/web_interface/tpl/error.tpl', {
            errorStatus: errorStatus,
            errorDescription: errorDescription
        }, function(data) {
            res.writeHead(errorStatus, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    
    processRequest(res, joinProjectAttributes) {
        
        bind.toFile('./node_backend/web_interface/tpl/joinProject.tpl', {
            // NOTHING TO PASS
        }, function(data) {
            res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    
}
