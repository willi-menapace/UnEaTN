var PrevisionEntity = require('../entities/PrevisionEntity.js');
var PrevisionDBHelper = require('../helpers/PrevisionDBHelper.js');
var PrevisionDataEntity = require('../entities/PrevisionDataEntity.js');
var pool = require('./pool.js');

module.exports = class PrevisionDataDBHelper {
    
    constructor() {
        // DEFAULT CONSTRUCTOR
    }
    
    // returns an array of prevision data of a given canteen and a given day
    // param day: day of the week. 0 means MONDAY, 4 means FRIDAY
    getPrevisionDataByCanteenIdAndDay(canteenId, day) {
        var promiseFunction = function(resolve, reject) {
            var previsionDBHelper = new PrevisionDBHelper();
            previsionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day).then(function(prevision) {
            
                var sql = 'SELECT *'
                + ' FROM prevision_data'
                + ' WHERE prevision_id = ?'
                + ' ORDER BY wait_seconds';

                var previsionsData = [];
                var previsionData = null;
                
                
                if(prevision !== null) {
                    pool.getConnection(function(err, connection) {
                        if(err) {
                            reject(err);
                        } else {
                            // Use the connection
                            connection.query(sql, [prevision.previsionId], function(err, result) {
                                // If there are some previsionData
                                if(typeof result !== 'undefined' && result.length > 0) {
                                    for(var i = 0; i < result.length; i++) {
                                        previsionData = new PrevisionDataEntity(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].wait_seconds);
                                        previsionsData[i] = previsionData; 
                                    } 
                                } else {
                                    // If there isn't any previsionData then returns null
                                    resolve(null);
                                }

                                // Done with the connetion
                                connection.release();

                                // Handle error after the release
                                if(err) {
                                    reject(err); 
                                } else {
                                    // If there isn't any previsionData then returns null
                                    resolve(previsionsData);  
                                }   
                            });
                        } 
                    });
                } else {
                    resolve(null);
                }  
            }, function(err) {
                console.log(err);
            });
        }
        
        return new Promise(promiseFunction);
    }
    
    // returns a prevision data of a given canteen in a given day and in a given time
    getPrevisionDataByCanteenIdAndTime(canteenId, day, time) {
        var promiseFunction = function(resolve, reject) {
            var previsionDBHelper = new PrevisionDBHelper(); 
            previsionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day).then(function(prevision) {
                var sql = 'SELECT *'
                + ' FROM prevision_data'
                + ' WHERE prevision_id = ? AND HOUR(arrive_time) = ? AND MINUTE(arrive_time) = ?';
                var previsionData = null; 
                
                if(prevision !== null) {
                    pool.getConnection(function(err, connection) {
                        if(err) {
                            reject(err);    
                        } else {
                            // Use the connection
                            connection.query(sql, [prevision.previsionId, time.getHours(), time.getMinutes()], function(err, result) {
                                // If there is a previsionData associated to that canteen at that time in that day
                                if(typeof result !== 'undefined' && result.length > 0) {
                                    var i = 0;
                                    previsionData = new PrevisionDataEntity(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].wait_seconds);
                                }

                                // Done with the connetion
                                connection.release();

                                // Handle error after the release
                                if(err) {
                                    reject(err);    
                                } else {
                                    // If there isn't any previsionData at that hour in that day then returns null
                                    resolve(previsionData);    
                                }       
                            });
                        } 
                    });
                } else {
                    resolve(previsionData); 
                }
            }, function(err) {
                console.log(err);
            });
        }
        
        return new Promise(promiseFunction);        
    }
    
    // returns the best prevision data of a given canteen in a given time range in a given day
    getBestPrevisionDataByCanteenIdAndTimeRange(canteenId, day, startTime, endTime) {
        var promiseFunction = function(resolve, reject) {
            var previsionDBHelper = new PrevisionDBHelper();
            previsionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day).then(function(prevision) {
                var sql = 'SELECT *'
                + ' FROM prevision_data'
                + ' WHERE prevision_id = ? AND arrive_time >= MAKETIME(?, ?, ?) AND arrive_time <= MAKETIME(?, ?, ?)'
                + ' ORDER BY wait_seconds'
                + ' LIMIT 1'; 
                var previsionData = null;

                if(prevision !== null) {
                    pool.getConnection(function(err, connection) {
                        if(err) {
                            reject(err);    
                        } else {
                            // Use the connection
                            connection.query(sql, [prevision.previsionId, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds()], function(err, result) {
                                // If there is a previsionData associated to that canteen at that time range in that day then returns the best
                                if(typeof result !== 'undefined' && result.length > 0) {
                                    var i = 0;
                                    previsionData = new PrevisionDataEntity(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].wait_seconds);
                                }

                                // Done with the connetion
                                connection.release();

                                // Handle error after the release
                                if(err) {
                                    reject(err);    
                                } else {
                                    // If there isn't any previsionData at that hour in that day then returns null
                                    resolve(previsionData);    
                                } 
                            });    
                        }   
                    });
                } else {
                   resolve(previsionData); 
                }      
        }, function(err) {
            console.log(err);
        });                     
    }
        
        return new Promise(promiseFunction); 
    }
    
}
