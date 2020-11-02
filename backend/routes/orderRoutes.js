const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderByid,updateOrderToPaid,getMyOrders,getAllOrders,updateOrderToDelivered} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleWare');
const admin  = require('../middleware/adminMiddleware');

// router.get('/',product.getProducts);
router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrders);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderByid);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

module.exports = router;