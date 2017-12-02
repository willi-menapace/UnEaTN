var CanteenEntity = require('../entities/CanteenEntity.js');
var pool = require('./pool.js');
var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');

module.exports = class CanteenDBHelper {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
	// returns an array of canteens
    // if doesn't exist any canteen then will return an empty array;
	getAllCanteens() {
        var promiseFunction = function(resolve, reject) { 
            var sql = 'SELECT * FROM canteens ORDER BY canteen_id';
            var canteens = [];
            var canteen = null;
            var error = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_CONNECTION_ERROR);
                    reject(error);
                } else {
                    // Use the connection
                    connection.query(sql, function(err, result) {
                        if(typeof result !== 'undefined' && result.length > 0) {
                           for(var i = 0; i < result.length; i++) {
                                canteen = new CanteenEntity(result[i].canteen_id, result[i].name, result[i].codename);
                                canteens[i] = canteen;
                            } 
                        }

                        // Done with the connetion
                        connection.release();

                        // Handle error after the release
                        if(err) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_QUERY_ERROR);
                            reject(error);     
                        } else {
                            resolve(canteens);
                        }                    
                    });
                }
            });  
        }
    
        return new Promise(promiseFunction);
	}
    
	// given a canteenId returns the canteen which has that id
    // if doesn't exist a canteen with that id then will return null
	getCanteenById(canteenId) {
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM canteens WHERE canteen_id = ?';
            var canteen = null;
            var error = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_CONNECTION_ERROR);
                    reject(error);
                } else {
                    // Use the connection
                    connection.query(sql, [canteenId], function (err, result) {
                        if (typeof result !== 'undefined' && result.length == 1) {
                            canteen = new CanteenEntity(result[0].canteen_id, result[0].name, result[0].codename);
                        }

                        // Done with the connetion
                        connection.release();  

                        // Handle error after the release   
                        if (err) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_QUERY_ERROR);
                            reject(error);
                        } else if (result.length > 1) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_INTERNAL_ERROR);
                            reject(error);
                        } else {
                            resolve(canteen);    
                        }
                        
                    });    
                }
            }); 
        }
        
        return new Promise(promiseFunction);
	}
    
	// given a name returns the canteen which has that name
    // if doesn't exist a canteen with that name then will return null
	getCanteenByCodeName(codeName) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM canteens WHERE codename = ?';
            var canteen = null;
            var error = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_CONNECTION_ERROR);
                    reject(error);    
                } else {
                    // Use the connection
                    connection.query(sql, [codeName], function (err, result) {
                        if (typeof result !== 'undefined' && result.length == 1) {
                            canteen = new CanteenEntity(result[0].canteen_id, result[0].name, result[0].codename);
                        }

                        // Done with the connetion
                        connection.release();

                        // Handle error after the release
                        if (err) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_QUERY_ERROR);
                            reject(error);    
                        } else if (result.length > 1) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_INTERNAL_ERROR);
                            reject(error);   
                        } else {
                            resolve(canteen);    
                        } 
                    });    
                }  
            });
        }
    
        return new Promise(promiseFunction);
	}
    
	// returns the number of canteens
	getNumberOfCanteens() {
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT COUNT(*) AS num_of_canteens FROM canteens';
            var con = DatabaseHelper.getConnection();
            var numOfCanteens = 0;
            var error = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_CONNECTION_ERROR);
                    reject(error);    
                } else {
                    // Use the connection
                    connection.query(sql, function (err, result) {
                        if (typeof result !== 'undefined' && result.length == 1) {
                           numOfCanteens = result[0].num_of_canteens; 
                        }

                        // Done with the connetion
                        connection.release();

                        // Handle error after the release
                        if (err) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_QUERY_ERROR);
                            reject(error);    
                        } else if (result.length > 1) {
                            error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_INTERNAL_ERROR);
                            reject(error);    
                        } else {
                            resolve(numOfCanteens);    
                        }                  
                    });
                }
            });    
        }
        
        return new Promise(promiseFunction);
	}
    
}
