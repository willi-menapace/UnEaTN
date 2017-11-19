var DatabaseHelper = require('./DatabaseHelper.js');
var PrevisionEntity = require('../entities/PrevisionEntity.js');

module.exports = class PrevisionDBHelper extends DatabaseHelper {
    
    constructor() {
        this.pool = mysql.createPool({
            //connectionLimit: 
            host: "nanobit.eu",
            user: "mluser",
            password: "sfHEROWIFJ45EFH8fj38spL937234SDF9$@AkwpcuFoH4DFHjfDSD3432BZ",
            database: "unieatn"
        });
    }
    
    // returns the latest prevision object of a given day of a given canteen
    static getLatestPrevisionByCanteenIdAndDay(canteenId, day) {
        var sql = 'SELECT previsions.prevision_id, previsions.opening_hour_id, previsions.generation_date'
        + 'FROM opening_hours, previsions'
        + 'WHERE opening_hours.canteen_id = ? AND opening_hours.weekday = ? AND opening_hours.opening_hour_id = previsions.opening_hour_id'
        + 'ORDER BY previsions.generation_date DESC'
        + 'LIMIT 1';
        var prevision = null;
        
        this.pool.getConnection(function(err, connection) {
            if(err) throw err;
            // Use the connection
            connection.query(sql, [canteenId, day], function(err, result) {
                
                if(result.lenght != 0) {
                    prevision = new PrevisionEntity(result[0].prevision_id, result[0].opening_hour_id, result[0].generation_date);
                }
                
                // Done with the connetion
                connection.release();
                
                // Handle error after the release
                if(err) throw err;
                
                return prevision;
            });
        });
    } 
}