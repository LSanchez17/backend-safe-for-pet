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

    static async specificFood(whichFood, whichAnimal){
        let query = await db.query(`SELECT poisonous
                                    FROM FoodStatus
                                    WHERE foodName = $1 AND animal = $2`,[whichFood, whichAnimal]);
        let result = query.rows[0];

        // console.log('making a request')

        if(!result){
            throw new NotFoundError(`Food not found, please try ingredients in food item`);
        }

        return result;
    }
}

module.exports = AnimalApi;