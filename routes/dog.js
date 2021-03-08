const express = require('express');
const AnimalApi = require('../models/AnimalApi');
const { needsThrottling } = require('../middleware/throttle');

const router = new express.Router();
const CurrentAnimal = 'dog';

/*
* Handles the request for dogs, specifically
* returns a response object, with the boolean, and source of info
* Will later handle admin user routing
*/

//All bad foods for dogs
router.get('/', needsThrottling, async (req, res, next) => {
    try{
        const resp = await AnimalApi.getAll(CurrentAnimal);
        
        return res.json({foods: [resp]});
    }
    catch(e){
        return next(e);
    }
});

router.get('/search', needsThrottling, async (req, res, next) => {
    try{
        let whichFood = req.query;
        console.log(whichFood)

        if(typeof whichFood !== 'string'){
            whichFood = whichFood.toString();
        }

        const resp = await AnimalApi.specificFood(whichFood, CurrentAnimal);
        
        return resp.json({answer: resp});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;