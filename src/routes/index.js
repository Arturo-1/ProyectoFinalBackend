const { Router } = require('express');
const router = Router();
// const path = require('path');

const products = require('./products.js');
const cart = require('./cart.js');

router.use('/productos', products);
router.use('/carrito', cart);

module.exports = router;