const express = require('express');
const { logVoice } = require('../middleware/logVoice');
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
        // console.log(req.ip)
        //get data, and post it user visit, etc
        let userVisit = await loggingApi.checkPreviousVisit(req.ip);

        if(userVisit){
            await loggingApi.UpdateVisitData(req.ip);
            return res.json({message: 'Success'})
        }
        else{
            await loggingApi.postVisit(req.ip);
            return res.json({message: 'Success'});
        }
    }
    catch(e){
        return next(e);
    }
})

router.post('/voice', logVoice, async (req, res, next) => {
    try{
        return res.json({status: 'voicelog updated'});
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;