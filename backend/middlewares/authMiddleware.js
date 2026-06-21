const userModel = require('../models/userModel')   
const jwt = require('jsonwebtoken')
const BlackListToken = require('../models/blackListTokenModel');


//  authenticateUser -----------------

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

 