const express = require('express');
const router = express.Router();
const {authUser,getUserProfile,updateUserProfile,registerUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleWare');

// router.get('/',product.getProducts);
router.route('/').post(registerUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

module.exports = router;