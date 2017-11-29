var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var QRPreprocessor = require('../preprocessors/QRPreprocessor.js');
var bind = require('bind');

module.exports = class QRHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new QRPreprocessor();
        super(preprocessor);
    }
    
    processParseOfValidationFailure(res, errorDescription) {
        res.status(500);
        res.end(errorDescription);
    }
    
    processRequest(res, qrAttributes) {
        
        bind.toFile('./node_backend/web_interface/tpl/qr.tpl', {
            // NOTHING TO PASS
        }, function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    }
}