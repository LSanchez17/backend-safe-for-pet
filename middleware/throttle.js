const { LimitHit } = require('../expressError');

//we use the middlewar req.app.locals to access the instance of the VolumeHandler class
//then call methods upon it based on the requests and number of requests
//only one instance per server, to handle many calls
const needsThrottling = (req, res, next) => {
    try{
        //grab ip, and a value if it exist
        let userIp = req.ip;
        let requestValue = req.params;
        // console.log(userIp, requestValue)
        
        //input them into the queue
        req.app.locals.queue.enqueue(requestValue, userIp);

        console.log(req.app.locals.queue)
        //figure out if our queue of requests is at limit
        let throttleUser = req.app.locals.queue.checkRequestIn(userIp);

        //if its limited, stop request, remove item added to queue
        if(throttleUser){
            req.app.locals.queue.leaveQueue();
            throw new LimitHit();
        }
        
        //didn't have to stop the requests, process another item in the queue
        req.app.locals.queue.dequeue();
        return next();
    }
    catch(e){
        return next(e);
    }
}

module.exports = {needsThrottling};