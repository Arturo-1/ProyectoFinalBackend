class Producto {
    constructor(title, description, thumbnail, price, stock, code) {
        this.id = 0;
        this.timestamp = new Date(Date.now());
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
}

module.exports = {
    Producto: Producto,
};