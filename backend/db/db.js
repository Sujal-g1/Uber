const mongoose = require('mongoose')

 const connectDb = async() => {
    try{
       await  mongoose.connect(process.env.DB_CONNECT)
        console.log('Connected to DB');
    }
    catch(error){
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }

    }

    module.exports = connectDb