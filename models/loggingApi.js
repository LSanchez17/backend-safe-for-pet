const db = require('../db');
const { NotFoundError } = require('../expressError');

class loggingApi {
    static async getAll(){
        //returns list of all visitors with timestamps
        let query = await db.query(`SELECT * 
                    FROM userlogs`);
        
        let results = query.rows;

        if(!results){
            throw new NotFoundError(`No users have visited recently :(`);
        }

        return results;
    }

    static async postVisit(data){
        //first time visiting
        let query = await db.query(`INSERT INTO userlogs(ip_address)
                    VALUES($1)
                    RETURNING date_entered`, [data]);
                
        let results = query.rows[0];

        return results;
    }

    static async UpdateVisitData(data){
        //so that means there must be a previous visit
        //update the last time!
        let newTimeStamp = new Date();
        let query = await db.query(`UPDATE userlogs
                            SET date_entered = $1
                            WHERE ip_address = $2
                            RETURNING date_entered`, [newTimeStamp, data]);

        let result = query.rows[0];
        return result;
    }

    static async checkPreviousVisit(data){
        //test to see if we have visited before!
        let query = await db.query('SELECT date_entered FROM userlogs WHERE ip_address = $1', [data]);

        if(query.rows){
            return true;
        }

        return false;
    }
};

module.exports = loggingApi;