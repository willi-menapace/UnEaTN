var DatabaseHelper = require('./DatabaseHelper.js');
var PrevisionDBHelper = require('./PrevisionDBHelper.js');
var PrevisionEntity = require('../entities/PrevisionEntity.js');
var PrevisionDataEntity = require('../entities/PrevisionDataEntity.js');

module.exports = class PrevisionDataDBHelper extends DatabaseHelper {
    
    constructor() {
        this.pool = mysql.createPool({
            //connectionLimit: 
            host: "nanobit.eu",
            user: "mluser",
            password: "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
            database: "unieatn"
        });
    }
    
    // returns an array of prevision data of a given canteen and a given day
    // param day: day of the week. 0 means MONDAY, 4 means FRIDAY
    static getPrevisionDataByCanteenIdAndDay(canteenId, day) {
        var sql = 'SELECT *'
        + 'FROM prevision_data'
        + 'WHERE prevision_id = ?'
        + 'ORDER BY arrive_time';
        var prevision = PrevisionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day);
        var previsionsData = [];
        var previsionData = null;
        
        if(prevision !== null) {
            this.pool.getConnection(function(err, connection) {
                if(err) throw err;
                // Use the connection
                connection.query(sql, [prevision.previsionId], function(err, result) {
                    // If there are some previsionData
                    if(result.lenght != 0) {
                        for(var i = 0; i < result.lenght; i++) {
                            previsionData = new PrevisionData(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].waitSeconds);
                            previsionsData[i] = previsionData; 
                        } 
                    }
                    
                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) throw err; 
                });
            });
        }
        
        // If there isn't any previsionData then returns an empty array
        return previsionsData;
    }
    
    // returns a prevision data of a given canteen in a given day and in a given time
    static getPrevisionDataByCanteenIdAndTime(canteenId, day, time) {
        var sql = 'SELECT *'
        + 'FROM prevision_data'
        + 'WHERE prevision_id = ? AND HOUR(arrive_time) = ? AND MINUTE(arrive_time) = ?';
        var prevision = PrevisionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day);
        var previsionData = null; 
    
        if(prevision !== null) {
            this.pool.getConnection(function(err, connection) {
                if(err) throw err;
                // Use the connection
                connection.query(sql, [prevision.previsionId, time.getHours(), time.getMinutes()], function(err, result) {
                    // If there is a previsionData associated to that canteen at that time in that day
                    if(result.lenght != 0) {
                        var i = 0;
                        previsionData = new PrevisionData(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].waitSeconds);
                    }
                    
                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) throw err;
                    if(result.lenght > 1) throw err;
                });
            });
        }
        
        // If there isn't any previsionData at that hour in that day then returns null
        return previsionData;     
    }
    
    // returns the best prevision data of a given canteen in a given time range in a given day
    static getBestPrevisionDataByCanteenIdAndTimeRange(canteenId, day, startTime, endTime) {
        var sql = 'SELECT *'
        + 'FROM prevision_data'
        + 'WHERE prevision_id = ? AND arrive_time >= MAKETIME(?, ?, ?) AND arrive_time <= MAKETIME(?, ?, ?)'
        + 'ORDER BY arrive_time'
        + 'LIMIT 1';
        var prevision = PrevisionDBHelper.getLatestPrevisionByCanteenIdAndDay(canteenId, day);
        var previsionData = null;
        
        if(prevision !== null) {
            this.pool.getConnection(function(err, connection) {
                if(err) throw err;
                // Use the connection
                connection.query(sql, [prevision.previsionId, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds], function(err, result) {
                    // If there is a previsionData associated to that canteen at that time range in that day then returns the best
                    if(result.lenght != 0) {
                        var i = 0;
                        previsionData = new PrevisionData(result[i].prevision_data_id, result[i].prevision_id, result[i].arrive_time, result[i].waitSeconds);
                    }
                    
                    // Done with the connetion
                    connection.release();

                    // Handle error after the release
                    if(err) throw err;
                    if(result.lenght > 1) throw err;
                });
            });
        }
        
        // If there isn't any previsionData at that hour in that day then returns null
        return previsionData;   
    }
    
}
