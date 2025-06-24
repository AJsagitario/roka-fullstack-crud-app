
const db= require('../database')

//get
const getMascot=(req,res) => {
    db.query('SELECT * FROM mascota', (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la database'});
        res.json(results);
    });
};

const postMascot= (req, res) => {
    const {nombre, especie, raza, edad, dueño_id} =req.body;

    if (!nombre || !especie || !raza || !edad || !dueño_id) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios'})
    }
    const sql='INSERT INTO mascota (nombre, especie, raza, edad, dueño_id) VALUES (?,?,?,?,?)';
    db.query(sql, [nombre,especie,raza,edad,dueño_id], (err,result) => {
        if (err) return res.status(500).json({error: 'Error al crear mascota'});
        res.status(201).json({message: 'Mascota registrado exitosamente', id:result.insertId});
    });
};

const getMascotforId= (req, res) => {
    const id= req.params.id;
    db.query('SELECT * FROM mascota WHERE id=?', [id],(err,result) => {
        if (err) return res.status(500).json({error: 'Error en la database'});
        if (result.length===0) return res.status(404).json({error: 'Mascota no encontrada'});
        res.json(result[0]);
    });
};

const putMascot= (req,res) => {
    const id= req.params.id;
    const {nombre, especie, raza, edad, dueño_id} = req.body;

    if (!nombre || !especie || !raza || !edad || !dueño_id) {
        return res.status(400).json({error: 'Completar todos los campos obligatorios'});
    }
    const sql='UPDATE mascota SET nombre=?, especie=?, raza=?, edad=?, dueño_id=? WHERE id=?';
    db.query(sql, [nombre,especie, raza, edad, dueño_id], (err,result) => {
        if(err) return res.status(500).json({error: 'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Mascota no encontrado'});
        res.json({message:'Mascota actualizado con exito'});
    });
};
const deleteMascot= (req, res) => {
    const id = req.params.id;

    const sql='DELETE FROM mascota WHERE id=?';
    db.query(sql, [id], (err, result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows ===0) return res.status(404).json({error: 'Mascota no encontrado'});
        res.json({message:'Mascota eliminado con exito'});
    });
};
module.exports={
    getMascot,
    postMascot,
    getMascotforId,
    putMascot,
    deleteMascot
};