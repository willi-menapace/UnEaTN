var OpeningHourEntity = require('../entities/OpeningHourEntity.js');
var pool = require('./pool.js');

module.exports = class OpeningHourDBHelper {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    // returns opening hour of a given canteen in a given day
    getOpeningHourByCanteenIdAndDay(canteenId, day) {
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM opening_hours WHERE canteen_id = ? AND weekday = ?';
            var openingHour = null;

            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
                } else {
                    // Use the connection
                    connection.query(sql, [canteenId, day], function(err, result) {
                        if(typeof result[0] !== 'undefined' && result.length > 0) {
                            openingHour = new OpeningHourEntity(result[0].opening_hour_id, result[0].canteen_id, result[0].weekday, result[0].open_time, result[0].close_time);
                        }

                        // Done with the connetion
                        connection.release();

                        // Handle error after the release
                        if(err) {
                            reject(err);    
                        } else if (result.length > 1) {
                             reject(err);     
                        } else {
                            // Returns null if canteen is closed
                            resolve(openingHour);    
                        }  
                    });                    
                }
            });   
        }
        
        return new Promise(promiseFunction);
    }
    
    // returns an array of opening hours of a given canteen
    // The array will be composed by 7 elements, one for each day
    // If in a given day the canteen is closed then the corresponding
    // element will be set to null
    // Returns an empty array in case of the given canteen
    // doesn't contain any opening hour
    getOpeningHoursByCanteenId(canteenId) {
        var promiseFunction = function(resolve, reject) {
            var sql = 'SELECT * FROM opening_hours WHERE canteen_id = ? ORDER BY opening_hours.weekday';
            var openingHours = [];
            var openingHour = null;
            const DAY_PER_WEEK = 7;
            
            pool.getConnection(function(err, connection) {
                if(err) {
                    reject(err);
                } else {
                    // Use the connection
                    connection.query(sql, [canteenId], function(err, result) {
                        if(typeof result !== 'undefined' && result.length > 0) {
                            for(var i = 0, j = 0; i < DAY_PER_WEEK; i++) {
                                if(typeof result[j] !== 'undefined') {
                                   openingHour = new OpeningHourEntity(result[j].opening_hour_id, result[j].canteen_id, result[j].weekday, result[j].open_time, result[j].close_time);
                                    if(openingHour.weekDay == i) {
                                        openingHours[i] = openingHour;
                                        j++;
                                    } else {
                                        openingHours[i] = null;
                                    }
                                } else {
                                    openingHours[i] = null;
                                }
                            }
                        }

                        // Handle error after the release
                        if(err) {
                            reject(err);
                        } else {
                            resolve(openingHours);    
                        }           
                    });
                }
            });
        }
        
        return new Promise(promiseFunction);
    }
    
}