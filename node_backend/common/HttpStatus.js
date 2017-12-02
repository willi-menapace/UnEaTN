var enumify = require('enumify');

class HttpStatus extends enumify.Enum {};
HttpStatus.initEnum({
    OK: {
        status: 200
    },
    BAD_REQUEST: {
        status: 400
    },
    NOT_FOUND: {
        status: 404
    },
    INTERNAL_SERVER_ERROR: {
        status: 500
    },
    PERMISSION_DENIED: {
        status: 550
    } 
});

module.exports = HttpStatus;