const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const generateToken = require('../utils/generateWebToken');

const userJSONFields = (user,shouldGenerateToken) => {
    let userObject = {
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    }
    if(shouldGenerateToken){
        return {
            ...userObject,
            token:generateToken(user._id)
        }
    }else{
        return userObject;
    }
}

// Description
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body ;
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json(userJSONFields(user,true));
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// Description
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body ;
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists here!');
    }

    const user = await User.create({name,email,password});
    if(user){
        res.status(201).json(userJSONFields(user,true));
    }else{
        res.status(400);
        throw new Error('Invalid user data passed');
    }
});

// Description
// @desc    Get the user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json(userJSONFields(user,false));
    }else{
        res.status(404);
        throw new Error('User has not found');
    }
});

// Description
// @desc    Update the user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json(userJSONFields(updatedUser,true));
    }else{
        res.status(404);
        throw new Error('User has not found');
    }
});

// Description
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find({});
    res.json(users);
});

// Description
// @desc    Delete User
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);
    if(user){
        await user.remove();
        res.json({message : "User Removed"});
    }else{
        res.status(404);
        throw new Error('User is not found');
    }
});

// Description
// @desc    Get User by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserByID = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User is not found');
    }
});

// Description
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req,res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();

        res.json(userJSONFields(updatedUser,false));

    }else{
        res.status(404);
        throw new Error('User has not found');
    }
});

module.exports = {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}