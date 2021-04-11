const express = require('express');
const cors = require('cors');
const dogRoutes = require('./routes/dog');
const logRoutes = require('./routes/logging');
const VolumeHandler = require('./helpers/VolumeHandler');
const { NotFoundError } = require('./expressError');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.locals.queue = new VolumeHandler();

//handle routes for dogs specifially
app.use('/dogs', dogRoutes);
app.use('/logs', logRoutes);

//future update, handle routes for animal, similar to /dogs

//404 handler
app.use( (req, res, next) => {
    console.log(req.params)
    return next(new NotFoundError());
});

//errors in general
app.use( (err, req, res, next) => {
    if(process.env.NODE_ENV !== 'test'){
        console.error(err.stack);
    }
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});

module.exports = app;