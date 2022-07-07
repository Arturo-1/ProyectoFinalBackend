// Verifica que el usuario tenga autorización
const checkAuth = (req, res, next) => {
    if (req.body.administrador) {
        next();
    } else {
        res.status(403).send({ error: -1, descripcion: `Ruta ${req.url} y/o metodo ${req.method} no autorizados`});
    }
}

module.exports = { checkAuth };