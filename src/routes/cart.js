const { Router } = require('express');
const router = Router();

const { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart } = require('../controllers/cart.js');

// /**************************************************/
// /*****************    RUTAS    ********************/
// /**************************************************/
// // Crea un carrito y devuelve su id
router.post('/', newCart);
// // Elimina un carrito según su id
router.delete('/:id', deleteCart);
// // Devuelve todos los productos de un carrito
router.get('/:id/productos', getProductsCart);
// // Recibe y agrega un producto en el carrito
router.post('/:id/productos', saveProductsCart);
// // Elimina un producto de un carrito según sus id
router.delete('/:id/productos/:id_prod', deleteProductCart);

module.exports = router;