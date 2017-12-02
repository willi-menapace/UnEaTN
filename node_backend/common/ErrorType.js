var enumify = require('enumify');

class ErrorType extends enumify.Enum {};
ErrorType.initEnum({
    DB_CONNECTION_ERROR: {
        errorDescription: "Database connection error"
    },
    DB_QUERY_ERROR: {
        errorDescription: "Database query error"
    },
    DB_INTERNAL_ERROR: {
        errorDescription: "Database internal error"
    },
    DAY_ERROR: {
        errorDescription: "Sorry, this is an invalid day"
    },
    START_TIME_ERROR: {
        errorDescription: "Sorry, this is an invalid start time"
    },
    END_TIME_ERROR: {
        errorDescription: "Sorry, this is an invalid end time"
    },
    CANTEEN_ERROR: {
        errorDescription: "Sorry, this is an invalid canteen"
    },
    AUTHENTICATION_ERROR: {
        errorDescription: "Sorry, this is an invalid auth-token"
    },
    TELEGRAM_ID_ERROR: {
        errorDescription: "Sorry, this is an invalid telegram id"
    },
    WAITING_TIME_ERROR: {
        errorDescription: "Sorry, this is an invalid waiting time"  
    },
    ARRIVE_TIME_ERROR: {
        errorDescription: "Sorry, this is an invalid arrive time"
    },
    URL_ERROR: {
        errorDescription: "Sorry, this is an invalid URL"
    },
    SINTAX_REQUEST_ERROR: {
        errorDescription: "Sorry, this is an invalid sintax request"
    }
});

module.exports = ErrorType;
