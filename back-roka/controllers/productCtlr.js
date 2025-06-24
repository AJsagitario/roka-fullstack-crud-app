const db = require ('../database')

const getProduct= (req,res) => {
    db.query('SELECT * FROM producto', (err,results) => {
        if (err) return res.status(500).json({error : 'Error en la database'});
        res.json(results);
    });

};
const postProduct= (req,res) => {
    const {nombre, precio, stock, descripcion} = req.body;

    if (!nombre || !precio || !stock || !descripcion) {
        return res.status(400).json({error: 'Todos los campos deben ser completados'});
    }
    const sql = 'INSERT INTO producto (nombre, precio, stock, descripcion) VALUES (?,?,?,?)';
    db.query(sql, [nombre, precio, stock, descripcion], (err,result)=> {
        if (err) return res.status(500).json({error: 'Error al crear producto'});
        res.status(201).json({message: 'Producto registrado exitosamente', id:result.insertId});
    });
};
const getProductforId= (req,res) => {
    const id=req.params.id;

    db.query('SELECT * FROM producto WHERE id=?', [id],(err,result) => {
        if (err) return res.status(500).json({error:'Error en la database'});
        if (result.length===0) return res.status(404).json({error: 'Producto no encontrado'});
        res.json(result[0]);
    });
};
const putProducto= (req, res) =>{
    const id= req.params.id;
    const {nombre, precio, stock, descripcion} = req.body;

    if (!nombre || !precio || !stock || !descripcion) {
        return res.status(400).json({error: 'Completar todos los campos obligatorios'});

    }
    const sql = 'UPDATE productos SET nombre=?, precio=?, stock=?, descripcion=? WHERE id=?';
    db.query(sql, [nombre, precio, stock, descripcion], (err,result) => {
        if(err) return res.status(500).json({error: 'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Producto no encontrado'});
        res.json({message: 'Producto actulizado'});
    });
};
const deleteProduct =(req, res) => {
    const id= req.params.id;
    const sql= 'DELETE FROM producto WHERE id=?';

    db.query(sql, [nombre,precio,stock,descripcion], (err,result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows===0) return res.status(404).json({error: 'Producto no encontrado'});
        res.json({message: 'Producto eliminado'});
    });
};
module.exports={
    getProduct,
    postProduct,
    getProductforId,
    putProducto,
    deleteProduct
};
