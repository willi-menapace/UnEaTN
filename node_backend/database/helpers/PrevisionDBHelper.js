var PrevisionEntity = require('../entities/PrevisionEntity.js');
var pool = require('./pool.js');

module.exports = class PrevisionDBHelper {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    // returns the latest prevision object of a given day of a given canteen
    getLatestPrevisionByCanteenIdAndDay(canteenId, day) {
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT previsions.prevision_id, previsions.opening_hour_id, previsions.generation_date'
            + ' FROM opening_hours, previsions'
            + ' WHERE opening_hours.canteen_id = ? AND opening_hours.weekday = ? AND opening_hours.opening_hour_id = previsions.opening_hour_id'
            + ' ORDER BY previsions.generation_date DESC'
            + ' LIMIT 1';
            var prevision = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);    
                } else {
                    // Use the connection
                    connection.query(sql, [canteenId, day], function(err, result) {
                        if(typeof result !== 'undefined' && result.length > 0) {
                            prevision = new PrevisionEntity(result[0].prevision_id, result[0].opening_hour_id, result[0].generation_date);
                        }
                        // Done with the connetion
                        connection.release();

                        // Handle error after the release
                        if(err) {
                            reject(err);    
                        } else {
                            resolve(prevision);    
                        }
                    });    
                }          
            });      
        }
        return new Promise(promiseFunction);
    } 

}