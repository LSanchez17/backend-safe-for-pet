const db = require('../db');
const { NotFoundError, FoodNotFoundError } = require('../expressError');

class AnimalApi{
    static async getAll(whichAnimal){
        let query = await db.query(`SELECT *
                     FROM foodstatus
                     WHERE animal = $1`, [whichAnimal]);

        // console.log(query)
        let results = query.rows;

        if(!results){
            throw new NotFoundError(`No data found for ${whichAnimal}`);
        }

        return results;
    }

    static async specificFood(whichFood, whichAnimal){
        let query = await db.query(`SELECT poisonous, foodname, reference
                                    FROM FoodStatus
                                    WHERE foodName = $1 AND animal = $2`,[whichFood, whichAnimal]);
        let result = query.rows[0];

        // console.log('making a request')

        if(!result){
            throw new FoodNotFoundError(whichFood);
        }

        return result;
    }
}

module.exports = AnimalApi;