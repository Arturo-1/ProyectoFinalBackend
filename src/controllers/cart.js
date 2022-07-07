const { Contenedor } = require('../utils/contenedor');
const { Producto } = require('../utils/product');
const { Cart } = require('../utils/cart');

// Base de productos
const productos = new Contenedor('./productos.txt');
// Base de carritos
const carts = new Contenedor('./carts.txt');

// // Crea un carrito y devuelve su id
const newCart = async(req, res) => {
    try {
        let id = await carts.save(new Cart);
        res.status(201).json(id);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// // Elimina un carrito según su id
const deleteCart = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await carts.getById(id);

        if (!cart) throw 'El Carrito no fue encontrado';

        await carts.deleteById(id);
        res.status(200).json('El carrito fue eliminado');
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Devuelve todos los productos de un carrito
const getProductsCart = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const cart = await carts.getById(id);

        if (!cart) throw 'El Carrito no fue encontrado';

        res.status(200).json(cart.productos);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto en el carrito
const saveProductsCart = async(req, res) => {
    try {
        const { id } = req.body;

        const id_cart = Number(req.params.id);
        const currentCart = await carts.getById(id_cart);

        if (!currentCart) throw 'El Carrito no fue encontrado';

        const cart = new Cart;
        cart.updateCart(currentCart);

        if (!cart) throw 'El Carrito no fue encontrado';

        const producto = await productos.getById(Number(id));
        if (!producto) throw 'Producto no fue encontrado';

        if (producto.stock == 0) throw 'Sin stock de producto';
        cart.addProduct(producto);

        await carts.updateById(id_cart, cart);
        res.status(200).json('Producto Agregado Correctamente');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}


// // Elimina un producto de un carrito según sus id
const deleteProductCart = async(req, res) => {
    try {
        const id_cart = Number(req.params.id);
        const currentCart = await carts.getById(id_cart);

        if (!currentCart) throw 'El Carrito no fue encontrado';

        const cart = new Cart;
        cart.updateCart(currentCart);

        const id = Number(req.params.id_prod);
        const producto = await cart.getById(id);

        if (!producto) throw 'Producto no ubicado en carrito';

        cart.removeProduct(producto);
        await carts.updateById(id_cart, cart);
        res.status(200).json('Producto eliminado correctamente');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { newCart, deleteCart, getProductsCart, saveProductsCart, deleteProductCart }