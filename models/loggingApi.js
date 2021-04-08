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
        let query = await db.query(`INSERT INTO userlogs(ip_address)
                    VALUES($1)
                    RETURNING date_entered`, [data]);
        
        console.log(data, query)
        
        let results = query.rows[0];

        if(results){
            return results;
        }
        //our previous query errored, so that means there must be a previous visit
        //update the last time!
        let newTimeStamp = new Date();
        let newQuery = await db.query(`UPDATE userlogs
                            SET date_entered = $1
                            WHERE ip_address = $2
                            RETURNING date_entered`, [newTimeStamp, data]);

        let newResult = newQuery.rows[0];
        return newResult;
    }
};

module.exports = loggingApi;