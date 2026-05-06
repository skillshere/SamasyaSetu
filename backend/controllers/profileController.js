const User = require('../models/user');
const getProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }
        res.status(200).json(user);
        console.log('User role:', user.role);
    } catch (error) {
        res.status(500).json({message : 'Error fetching user',error});
    }
}
const updateProfile = async(req,res)=>{
    try{
        const {username,email,address,city,state} = req.body;
        const user = await User.findByIdAndUpdate(req.user.id,{username,email,address,city,state},{new:true}).select('-password');
        if(!user){
            return res.status(404).json({message : 'User not found'});
        }
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({message : 'Error updating user',error});
    }
}
module.exports = {
    getProfile,
    updateProfile
}