var MeasureEntity = require('../entities/MeasureEntity.js');
var pool = require('./pool.js');
var Error = require('../../common/Error.js');
var HttpStatus = require('../../common/HttpStatus.js');
var ErrorType = require('../../common/ErrorType.js');

module.exports = class MeasureDBHelper {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    // Add a new entry in measures 
    addMeasure(measure) {
        var promiseFunction = function(resolve, reject) {
            // Method to insert measure in uneatn database not in that created for ml
            var sql = "INSERT INTO measures (user_id, canteen_id, arrive_time, wait_seconds) VALUES ?";
            var values = [];
            values.push([measure.userId, measure.canteenId, measure.arriveTime, measure.waitSeconds]);
            var error = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_CONNECTION_ERROR);
                    reject(error);
                } 
                // Use the connection
                connection.query(sql, [values], function(err, result) {
                    measure.measureId = result.insertId;

                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) {
                        error = new Error(HttpStatus.INTERNAL_SERVER_ERROR, ErrorType.DB_QUERY_ERROR);
                        reject(error);
                    } else {
                        resolve();
                    }
                    
                });
            });
        }
        
        return new Promise(promiseFunction);
        
    }

}