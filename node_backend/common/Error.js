module.exports = class Error {
    constructor(statusType, descriptionType) {
        // statusType is of type HttpStatus
        this.statusType = statusType;
        // descriptionType is of type ErrorType
        this.descriptionType = descriptionType;
    }
}