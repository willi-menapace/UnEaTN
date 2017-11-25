var CanteenEntity = require('../entities/CanteenEntity.js');
var pool = require('./pool.js');

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

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
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
                            reject(err);     
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

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
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
                            reject(err);
                        } else if (result.length > 1) {
                            reject(err);
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

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);    
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
                            reject(err);    
                        } else if (result.length > 1) {
                            reject(err);   
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

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);    
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
                            reject(err);    
                        } else if (result.length > 1) {
                            reject(err);    
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
