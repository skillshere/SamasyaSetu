const express = require('express');
const router = express.Router();
const {getProfile,updateProfile} = require('../controllers/profileController');
const {isAuth} = require('../middleware/isAuth');
router.get('/myprofile',isAuth,getProfile);
router.put('/update',isAuth,updateProfile);
module.exports = router;