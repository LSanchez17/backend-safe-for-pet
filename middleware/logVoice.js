const loggingApi = require('../models/loggingApi');

const logVoice = async (req, res, next) =>{
    try{
        // console.log('bruhh',req)
        if(req.body.voiceLog.length > 1){
            await loggingApi.storeVoiceLog(req.body.voiceLog);

            return next();
        }
        //no voicelog found
        return next();
    }
    catch(e){
        //something went terribly wrong!
        return next(e);
    }   
}

module.exports = {logVoice};