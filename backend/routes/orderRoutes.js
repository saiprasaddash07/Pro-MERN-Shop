const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderByid,updateOrderToPaid} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleWare');

// router.get('/',product.getProducts);
router.route('/').post(protect,addOrderItems);
router.route('/:id').get(protect,getOrderByid);
router.route('/:id/pay').put(protect,updateOrderToPaid);

module.exports = router;