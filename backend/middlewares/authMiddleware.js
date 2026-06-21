const userModel = require('../models/userModel')   
const jwt = require('jsonwebtoken')
const BlackListToken = require('../models/blackListTokenModel');
const captainModel = require('../models/captainModel')


//  authenticate User -----------------
module.exports.authUser = async (req, res, next) => {

    try{
    const token = req.cookies?.token || req.headers.authorization?.split( ' ')[1];

        if(!token){
            return res.status(401).json({message: 'No token provided'})
        }

        const isBlackListed = await BlackListToken.findOne({ token })
        if (isBlackListed) {
            return res.status(401).json({ message: 'Unauthorized Token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)

        // if user was deleted from the database after the token was issued 
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        req.user = user;

        return next()
    }
    catch (error) {
    return res.status(401).json({message: 'Invalid Access'})
    }

    }   

//  authenticate Captain -----------------
module.exports.authCaptain = async (req, res, next) => {
    
    try{
    const token = req.cookies?.token || req.headers.authorization?.split( ' ')[1];  
     
    // console.log('Token:', token);
    if(!token){
        return res.status(401).json({message: 'No token provided'})
    }

    const isBlackListed = await BlackListToken.findOne({ token })
    // console.log('Is Blacklisted:', isBlackListed); 
        if (isBlackListed) {
            return res.status(401).json({ message: 'Unauthorized Token' });
        }

     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const captain = await captainModel.findById(decoded._id)

     // if user was deleted from the database after the token was issued 
        if (!captain) {
            return res.status(401).json({
                message: 'Captain not found'
            });
        }

        req.captain = captain;
        return next();
    }
    catch (error) {
        // console.error('Authentication error:', error);
    return res.status(401).json({message: 'Invalid Access'})
    }

    }