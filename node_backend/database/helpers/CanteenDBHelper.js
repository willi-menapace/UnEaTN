var DatabaseHelper = require('./DatabaseHelper.js');
var CanteenEntity = require('../entities/CanteenEntity.js');
var mysql = require('mysql');

module.exports = class CanteenDBHelper {
    
    constructor() {
        this.pool = mysql.createPool({
            //connectionLimit: 
            host: "nanobit.eu",
            user: "mluser",
            password: "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
            database: "unieatn"
        }); 
    }
    
	// returns an array of canteens
	getAllCanteens() {
        var sql = 'SELECT * FROM canteens ORDER BY canteen_id';
        var canteens = [];
        var canteen = null;
        
        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, function(err, result) {
                for(var i = 0; i < result.length; i++) {
                    console.log(result[i].canteen_id);
                    console.log(result[i].name);
                    canteen = new CanteenEntity(result[i].canteen_id, result[i].name);
                    canteens[i] = canteen;
                }
                
                // Done with the connetion
                connection.release();
                
                // Handle error after the release
                if(err) throw err;     
            });
        });  
        
        console.log(canteens);
        return canteens;
	}
    
	// given a canteenId returns the canteen which has that id
	getCanteenById(canteenId) {
        var sql = 'SELECT * FROM canteens WHERE canteen_id = ?';
        var canteen = null;
        
        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, [canteenId], function (err, result) {
                if (result.length == 1) {
                    canteen = new CanteenEntity(result[0].canteen_id, result[0].name);
                }

                // Done with the connetion
                connection.release();  

                // Handle error after the release   
                if (err) throw err;
                if (result.length > 1) throw err; 
            });
        }); 
        
        return canteen;
	}
    
	// given a name returns the canteen which has that name
	getCanteenByName(name) {
        var sql = 'SELECT * FROM canteens WHERE name = ?';
        var canteen = null;
        var con = DatabaseHelper.getConnection();

        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, [name], function (err, result) {
                if (result.length == 1) {
                    canteen = new CanteenEntity(result[0].canteen_id, result[0].name);
                }
                
                // Done with the connetion
                connection.release();
                
                // Handle error after the release
                if (err) throw err;
                if (result.length > 1) throw err;     
            });
        });
        
        return canteen;
	}
    
	// returns the number of canteens
	getNumberOfCanteens() {
        var sql = 'SELECT COUNT(*) AS num_of_canteens FROM canteens';
        var con = DatabaseHelper.getConnection();
        var numOfCanteens = null;
        
        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, function (err, result) {
                if (result.length == 1) {
                   numOfCanteens = result[0].num_of_canteens; 
                }
                
                // Done with the connetion
                connection.release();
                
                // Handle error after the release
                if (err) throw err;
                if (result.length > 1) throw err;
            });
        });
        
        return numOfCanteens;
	}
    
}
