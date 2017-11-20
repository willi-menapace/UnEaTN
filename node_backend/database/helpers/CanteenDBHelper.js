var CanteenEntity = require('../entities/CanteenEntity.js');
var mysql = require('mysql');

module.exports = class CanteenDBHelper {
    
    constructor() {
        this.pool = mysql.createPool({
                //connectionLimit: 
                host: "nanobit.eu",
                user: "mluser",
                password: "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
                database: "uneatn_sandbox"
        });
    }
    
	// returns an array of canteens
    // if doesn't exist any canteen then will return an empty array;
	getAllCanteens() {
        var self = this;
        var promiseFunction = function(resolve, reject) { 
            var sql = 'SELECT * FROM canteens ORDER BY canteen_id';
            var canteens = [];
            var canteen = null;

            self.pool.getConnection(function(err, connection) {
                if(err) reject(err);
                // Use the connection
                connection.query(sql, function(err, result) {
                    if(typeof result !== 'undefined' && result.length > 0) {
                       for(var i = 0; i < result.length; i++) {
                            canteen = new CanteenEntity(result[i].canteen_id, result[i].name);
                            canteens[i] = canteen;
                        } 
                    }
                    
                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) reject(err);  
                    
                    resolve(canteens);
                });
            });  
        }
    
        return new Promise(promiseFunction);
	}
    
	// given a canteenId returns the canteen which has that id
    // if doesn't exist a canteen with that id then will return null
	getCanteenById(canteenId) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM canteens WHERE canteen_id = ?';
            var canteen = null;

            self.pool.getConnection(function(err, connection) {
                if(err) reject(err);
                // Use the connection
                connection.query(sql, [canteenId], function (err, result) {
                    if (typeof result !== 'undefined' && result.length == 1) {
                        canteen = new CanteenEntity(result[0].canteen_id, result[0].name);
                    }

                    // Done with the connetion
                    connection.release();  

                    // Handle error after the release   
                    if (err) reject(err);
                    if (result.length > 1) reject(err); 
                    
                    resolve(canteen);
                });
            }); 
        }
        
        return new Promise(promiseFunction);
	}
    
	// given a name returns the canteen which has that name
    // if doesn't exist a canteen with that name then will return null
	getCanteenByName(name) {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM canteens WHERE name = ?';
            var canteen = null;

            self.pool.getConnection(function(err, connection) {
                if(err) reject(err);
                // Use the connection
                connection.query(sql, [name], function (err, result) {
                    if (typeof result !== 'undefined' && result.length == 1) {
                        canteen = new CanteenEntity(result[0].canteen_id, result[0].name);
                    }

                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if (err) reject(err);
                    if (result.length > 1) reject(err);
                    
                    resolve(canteen);
                });
            });
        }
    
        return new Promise(promiseFunction);
	}
    
	// returns the number of canteens
	getNumberOfCanteens() {
        var self = this;
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT COUNT(*) AS num_of_canteens FROM canteens';
            var con = DatabaseHelper.getConnection();
            var numOfCanteens = 0;

            self.pool.getConnection(function(err, connection) {
                if(err) reject(err);
                // Use the connection
                connection.query(sql, function (err, result) {
                    if (typeof result !== 'undefined' && result.length == 1) {
                       numOfCanteens = result[0].num_of_canteens; 
                    }

                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if (err) reject(err);
                    if (result.length > 1) reject(err);
                    
                    resolve(numOfCanteens);
                });
            });    
        }
        
        return new Promise(promiseFunction);
	}
    
}
