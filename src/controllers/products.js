const { Contenedor } = require('../utils/contenedor');
const { Producto } = require('../utils/product');

// Base de productos
const productos = new Contenedor('./productos.txt');

// Devuelve todos los productos
const getProducts = async(req, res) => {
    try {
        res.json(await productos.getAll());
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Devuelve un producto según su id
const getProductById = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no fue encontrado';
        res.status(200).json(producto);

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto, lo devuelve con su id asignado
const saveProduct = async(req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const producto = new Producto(title, description, thumbnail, Number(price), Number(stock), code);
        let id = await productos.save(producto);

        res.status(201).json(id);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Recibe y actualiza un producto segun su id
const updateProduct = async(req, res) => {
    try {
        const { title, description, thumbnail, price, stock, code } = req.body;
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no fue encontrado';

        productoModif = new Producto(title, description, thumbnail, Number(price), Number(stock), code);
        await productos.updateById(id, productoModif);
        res.status(200).json('Producto modificado correctamente');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Elimina un producto según su id
const deleteProduct = async(req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await productos.getById(id);

        if (!producto) throw 'producto no fue encontrado';

        await productos.deleteById(id);
        res.status(200).json('Producto eliminado corectamente');

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { getProducts, getProductById, saveProduct, updateProduct, deleteProduct }