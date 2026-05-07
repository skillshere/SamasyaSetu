const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../config/token');
const cookie =  require('cookie-parser')

const register = async(req,res)=>{
    try {
        const {username,email,password,state,city} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : 'Email already exists'});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,
            email,
            password : hashPassword,
            state,
            city
        });
        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({message : 'User registered successfully',user});
    } catch (error) {
        res.status(500).json({message : 'Error registering user',error});
    }
}
const login  = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : 'Invalid email or password'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message : 'Invalid email or password'});
        }
        const token = generateToken(user);
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({message : 'Login successful',user});
        

    }catch(error){
       res.status(500).json({message : 'Error logging in',error});
    }
}
const logout  = async(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message : 'Logout successful'});
    } catch (error) {
        res.status(500).json({message : 'Error logging out',error});
    }
}
module.exports = {register,login,logout};