const db = require('../database');

//Obtener todos los clientes
const getClientes = (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la database'});
        res.json(results);
    });
};

//registrar a un cliente
const postClientes = (req, res) => {
    const {nombre, correo, contra} = req.body;

    if (!nombre || !correo || !contra) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'});
    }
    const sql = 'INSERT INTO clientes (nombre,correo,contra) VALUES (?,?,?)';
    db.query(sql, [nombre,correo,contra], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al insertar cliente'});
        res.status(201).json({message: 'Cliente registrado', id: result.insertId});
    });
};
//Obtener cliente por su id
const getClienteById = (req, res) => {
    const id= req.params.id;

    db.query('SELECT * FROM clientes WHERE id =?', [id],(err,result) => {
        if (err) return res.status(500).json({ error: 'Error en la database'});
        if (result.length ===0) return res.status(404).json({ error: 'Cliente no encontrado'});
        res.json(result[0]);
    });
};
//actualizar cliente 
const putCliente= (req, res) => {
    const id= req.params.id;
    const {nombre, correo, contra} = req.body;

    if (!nombre || !correo || !contra) {
        return res.status(400).json({error: 'Todos los campos son obligatorios'});
    }
    const sql= 'UPDATE cliente SET nombre=?, correo=?, contra=? WHERE id=?';
    db.query(sql, [nombre, correo, contra, id], (err,result)=> {
        if (err) return res.status(500).json({ error: 'Error al actualizar'});
        if (result.affectedRows === 0) return res.status(404).json({error:'Cliente no encontrado'});
        res.json({message:'Cliente actualizado'});
    });
};
//eliminar cliente
const deleteCliente=(req, res) => {
    const id= req.params.id;

    const sql='DELETE FROM clientes WHERE id=?';
    db.query(sql, [id], (err,result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar'});
        if (result.affectedRows ===0) return res.status(404).json({error: 'Cliente no encontrado'});
        res.json({message: 'Cliente eliminado XD'});
    });
};

module.exports= {
    getClientes,
    getClienteById,
    postClientes,
    putCliente,
    deleteCliente
};