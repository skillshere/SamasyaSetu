const express = require('express');
const router = express.Router();
const {isAuth} = require('../middleware/isAuth');
const {getCurrentUser} = require('../controllers/authController');
router.get('/getCurrentUser',isAuth,getCurrentUser);
module.exports = router;