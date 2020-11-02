const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

// Description
// @desc    Create a new Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order items available!');
        return;
    }else{
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// Description
// @desc    Get order by the id
// @route   GET /api/orders/:id
// @access  Private
const getOrderByid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error('Order not found here!');
    }
});

// Description
// @desc    Update order to be paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status : req.body.status,
            update_time : req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found here!');
    }
});

// Description
// @desc    Update order to be delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error('Order not found here!');
    }
});

// Description
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id});

    res.json(orders);
});

// Description
// @desc    Get all orders to admin
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user','id name');

    res.json(orders);
});

module.exports = {
    addOrderItems,
    getOrderByid,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered
}