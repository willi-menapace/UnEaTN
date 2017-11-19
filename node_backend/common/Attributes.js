module.exports = class Attributes {
    constructor(){
        this.error = false;
        this.errorDescription = null;
    }
    getError(){
        return this.error;
    } 
    setError(error){
        this.error = error;
    }
    getErrorDescription(){
        return this.errorDescription;
    }
    setErrorDescription(errorDescription){
        this.errorDescription = errorDescription;
    }
} 