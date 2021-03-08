const VolumeHandler = require('../helpers/VolumeHandler');
const { LimitHit } = require('../expressError');

const needsThrottling = (req, res, next) => {
    try{
        let userIp = req.ip;
        let throttleUser = VolumeHandler.checkRequestIn(userIp);
        if(throttleUser){
            throw new LimitHit();
        }
        return next();
    }
    catch(e){
        return next(e);
    }
}

module.exports = {needsThrottling};