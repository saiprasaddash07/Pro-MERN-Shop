const express = require('express');
const router = express.Router();
const {authUser,
    getUserProfile,
    updateUserProfile,
    registerUser,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleWare');
const admin = require('../middleware/adminMiddleware');

// router.get('/',product.getProducts);
router.route('/').post(registerUser);
router.route('/').get(protect,admin,getUsers);
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserByID).put(protect,admin,updateUser);

module.exports = router;