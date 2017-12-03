var ApplicationHandlerSkeleton = require('../../ApplicationHandlerSkeleton.js');
var QRPreprocessor = require('../preprocessors/QRPreprocessor.js');
var HttpStatus = require('../../common/HttpStatus.js');
var bind = require('bind');

module.exports = class QRHandler extends ApplicationHandlerSkeleton {  
    constructor() {
        var preprocessor = new QRPreprocessor();
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
    
    processRequest(res, qrAttributes) {
        
        bind.toFile('./node_backend/web_interface/tpl/qr.tpl', {
            // NOTHING TO PASS
        }, function(data) {
            res.writeHead(HttpStatus.OK.status, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    
}