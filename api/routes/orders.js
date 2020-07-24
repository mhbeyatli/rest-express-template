const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const OrdersController = require('../controllers/orders')

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', OrdersController.create_order);

router.get('/:orderId', OrdersController.orders_get_one);

router.delete('/:orderId', OrdersController.delete_order);


module.exports = router;