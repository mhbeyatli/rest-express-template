const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth')
const ProductsController = require('../controllers/products')

router.get('/', ProductsController.get_all_products);

router.post('/', checkAuth, ProductsController.create_product);

router.get('/:productId', ProductsController.get_one_product);

router.patch('/:productId', checkAuth, ProductsController.update_product);

router.delete('/:productId', checkAuth, ProductsController.delete_product);

module.exports = router;