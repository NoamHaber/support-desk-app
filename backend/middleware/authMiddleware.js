const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')

const protect = asyncHandler(async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // Get token from bearer
            token = req.headers.authorization.split(' ')[1];
            // Decode token
            const decoded = jwt.verify(token,process.env.JWT_SECRET).id;
            // Get user from token
            req.user = await User.findById(decoded).select('-password');
            next();
        }
        catch(error){
            res.status(401);
            throw new Error('Unauthorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Unauthorized');
    } 
})

module.exports = {protect}