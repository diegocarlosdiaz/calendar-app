require('dotenv').config();

const mongoose = require('mongoose');

async function dbConnection ()  {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB_CNN Online');
    }
    catch (error){
    console.log(error);
    }
}

module.exports = dbConnection