const VolumeHandler = require('../helpers/VolumeHandler');
const { LimitHit } = require('../expressError');
const app = require('../app');

const needsThrottling = (req, res, next) => {
    try{
        //grab ip, and a value if it exist
        let userIp = req.ip;
        let requestValue = req.query || '';

        //input them into the queue
        app.locals.queue.enqueue(requestValue, userIp);

        //figure out if our queue of requests is at limit
        let throttleUser = VolumeHandler.checkRequestIn(userIp);

        //if its limited, stop request, remove item added to queue
        if(throttleUser){
            app.locals.queue.leaveQueue();
            throw new LimitHit();
        }
        
        //didn't have to stop the requests, process another item in the queue
        app.locals.queue.dequeue();
        return next();
    }
    catch(e){
        return next(e);
    }
}

module.exports = {needsThrottling};