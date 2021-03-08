const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');

class AnimalApi{
    static async getAll(whichAnimal){
        let query = await db.query(`SELECT *
                     FROM FoodStatus
                     WHERE animal = $1`, [whichAnimal]);

        let results = query.rows[0];

        if(!results){
            throw new NotFoundError(`No data found for ${whichAnimal}`);
        }

        return results;
    }

    static async specificFood(whichFood){
        let query = await db.query(`SELECT poisonous
                                    FROM FoodStatus
                                    WHERE foodName = $1
                                    `,[whichFood]);
        let result = query.rows[0];
        
        if(!results){
            throw new NotFoundError(`That food is currently not in our system, please try again later`);
        }

        return result;
    }
}

module.exports = AnimalApi;