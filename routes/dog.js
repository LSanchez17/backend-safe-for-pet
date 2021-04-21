const express = require('express');
const AnimalApi = require('../models/AnimalApi');
const { needsThrottling } = require('../middleware/throttle');
const {FoodNotFoundError} = require('../expressError');

const router = new express.Router();

/*
* Handles the request for dogs, specifically
* returns a response object, with the boolean, and source of info
* Will later handle admin user routing
*/

//All bad and good foods for dogs
router.get('/', needsThrottling, async (req, res, next) => {
    try{
        const foods = await AnimalApi.getAll(CurrentAnimal = 'dog');
        
        return res.json(foods);
    }
    catch(e){
        return next(e);
    }
});

router.get('/:foodItem', needsThrottling, async (req, res, next) => {
    try{
        let whichFood = req.params.foodItem.toLowerCase();
        // let whichAnimal = req.param.whichAnimal.toLowerCase();
        // console.log(whichFood);

        if(typeof whichFood !== 'string'){
            throw new Error('Invalid input type');
        }

        const food = await AnimalApi.specificFood(whichFood, whichAnimal = 'dog');
        
        if(!food){
            return new FoodNotFoundError();
        }

        return res.json({food});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;