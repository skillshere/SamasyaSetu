const User = require('../models/user');
const getCurrentUser = async(req,res)=>{
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
module.exports = {getCurrentUser};