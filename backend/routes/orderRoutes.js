const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderByid,updateOrderToPaid,getMyOrders} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleWare');

// router.get('/',product.getProducts);
router.route('/').post(protect,addOrderItems);
router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderByid);
router.route('/:id/pay').put(protect,updateOrderToPaid);

module.exports = router;