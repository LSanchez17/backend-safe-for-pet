const express = require('express');
const loggingApi = require('../models/loggingApi');

const router = new express.Router();

/*
    Logs user visits, voices log transcripts etc
    data deleted every sunday!
    Used for showing most common searches, etc.
*/

router.get('/', async (req, res, next) => {
    try{
        //get a list of visitors, voice logs, etc for front end manipulation
        let loggedData = await loggingApi.getAll();

        return res.json({loggedData});
    }
    catch(e){
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    try{
        //get data, and post it user visit, etc
        let userVisit = await loggingApi.postVisit(req.ip);
        
        return;
    }
    catch(e){
        return next(e);
    }
})



module.exports = router;