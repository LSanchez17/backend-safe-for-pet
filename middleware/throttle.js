const VolumeHandler = require('../helpers/VolumeHandler');
const { LimiHit } = require('../expressError');

const needsThrottling = (req, res, next) => {
    try{
        let userIp = req.ip;
        let throttleUser = await VolumeHandler.checkRequestIn(userIp);
        if(throttleUser){
            throw new LimiHit();
        }
        next();
    }
    catch(e){
        return next(e);
    }
}

module.exports = needsThrottling;