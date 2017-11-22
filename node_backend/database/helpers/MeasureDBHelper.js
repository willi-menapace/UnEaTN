var MeasureEntity = require('../entities/MeasureEntity.js');
var pool = require('./pool.js');

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

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
                } 
                // Use the connection
                connection.query(sql, [values], function(err, result) {
                    measure.measureId = result.insertId;

                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) reject(err);
                    
                });
            });
        }
        
        return new Promise(promiseFunction);
        
    }

}