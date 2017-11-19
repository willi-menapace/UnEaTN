var DatabaseHelper = require('./DatabaseHelper.js');
var OpeningHourEntity = require('../entities/OpeningHourEntity.js');
var mysql = require('mysql');

module.exports = class OpeningHourDBHelper {
    
    constructor() {
        this.pool = mysql.createPool({
            //connectionLimit: 
            host: "nanobit.eu",
            user: "mluser",
            password: "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
            database: "unieatn"
        }); 
    }
    
    // returns opening hour of a given canteen in a given day
    getOpeningHourByCanteenIdAndDay(canteenId, day) {
        var sql = 'SELECT * FROM opening_hours WHERE canteen_id = ? AND weekday = ?';
        var openingHour = null;
        
        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, [canteenId, day], function(err, result) {
                openingHour = new OpeningHourEntity(result[0].opening_hour_id, result[0].canteen_id, result[0].weekday, result[0].open_time, result[0].close_time);
                
                // Done with the connetion
                connection.release();
                
                // Handle error after the release
                if(err) throw err;
                if(result.length > 1) throw err;  
            });
        }); 
        
        return openingHour;
    }
    
    // returns an array of opening hours of a given canteen
    getOpeningHoursByCanteenId(canteenId) {
        const DAYS_PER_WEEK = 7;
        var openingHours = [];
        var openingHour = null;
        
        for(var weekDay = 0; weekDay < DAYS_PER_WEEK; weekDay++) {
            openingHour = this.getOpeningHourByCanteenIdAndDay(canteenId, i);
            openingHours[i] = openingHour;
        }
        
        return openingHours;  
    }
    
}