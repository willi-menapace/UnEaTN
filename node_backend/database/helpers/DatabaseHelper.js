var mysql = require('mysql');

module.exports = class DatabaseHelper {
    constructor() { 
    }
    
    static getPool() {
        console.log(this.pool.host);
        return this.pool;
    }
    
    static closePool() {
        this.pool.end(function (err) {
            // all connections in the pool have ended
        })
    }
}