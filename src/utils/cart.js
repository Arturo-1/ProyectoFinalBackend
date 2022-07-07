class Cart {
    constructor(title, description, thumbnail, price, stock, code) {
        this.id = 0;
        this.timestamp = new Date(Date.now());
        this.productos = [];
    }

    updateCart(object) {
        // Actualiza atributos del carrito
        try {
            this.id = object.id;
            this.timestamp = object.timestamp;
            this.productos = object.productos;
        } catch (err) {
            console.log('Error en método Para actualizar carrito: ', err);
        }
    }

    getAll() {
        // Devuelve un array con los objetos presentes en el carrito.
        try {
            return this.productos;
        } catch (err) {
            console.log('Error en método cargar carrito: ', err);
        }
    }

    getById(number) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const object = this.productos.find(object => object.id === number);
            return object ? object : null;
        } catch (err) {
            console.log('Error en método para visualizar id: ', err);
        }
    }

    addProduct(object) {
        // Agrega un producto al carrito.
        try {
            this.productos = [...this.productos, object];
        } catch (err) {
            console.log('Error en método Agregar Producto: ', err);
        }
    }

    removeProduct(object) {
        // Remueve un producto del carrito.
        this.productos = this.productos.filter(producto => producto.id != object.id);
    }
}

module.exports = {
    Cart: Cart,
};