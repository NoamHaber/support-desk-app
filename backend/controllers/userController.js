const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const User = require('../models/userModel');


// @desc Register a new user
// @route /api/users/register
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    //validation
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error('Please include all fields');
    }

    //Find if user already exists
    const userExists = await User.findOne({email})
    
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);


    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })        
    }else{
        res.status(400);
        throw new Error('Invslid user data')
    }
})


// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {

    const { email , password } = req.body

    const user = await User.findOne({email});

    //Check user and passwords match
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })        
    }
    else
    {
            res.status(400);
            throw new Error('Invalid user credentials')
    }
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
}


// @desc Gets user information
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req,res) => {
    const userInfo ={
        name : req.user.name,
        email : req.user.email
    }
    res.status(200);
    res.json(userInfo);
});

module.exports = {
    registerUser,
    loginUser,
    getMe
}