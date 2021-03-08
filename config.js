require('dotenv').config();

//get our special vars
const SECRET_KEY = process.env.SECRET_KEY || 'spicy';
const PORT = +process.env.PORT || 3001;

//get our special uri for the datbase, testing mode or production
const getDatabaseUri = () => {
    if(process.env.NODE_ENV === 'test'){
        return 'safepet_test';
    }
    else{
        return process.env.DATABASE_URL || 'safepet'
    }
}

console.log('config file');
console.log(`listening on port ${PORT}`);
console.log(`connected to database: ${getDatabaseUri()}`);

module.exports = {SECRET_KEY, PORT, getDatabaseUri};