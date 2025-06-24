const db= require('../database');

const getCitas=(req,res) => {
    db.query('SELECT * FROM cita', (err,results)=> {
        if (err) return res.status(500).json({error:'Error en la database'});
        res.json(results);
    });
};
const postCitas=(req,res) => {
    const {fecha, cliente_id, mascota_id, servicio} = req.body;

    if (!fecha || !cliente_id || !mascota_id || !servicio) {
        return res.status(400).json({error: 'Debe completar los campos obligatoriamente'});

    }
    const sql='INSERT INTO cita (fecha,cliente_id,mascota_id,servicio) VALUES(?,?,?,?)';
    db.query(sql, [fecha, cliente_id, mascota_id, servicio], (err,result)=> {
        if (err) return res.status(500).json({error:'Error al crear la cita'});
        res.status(201).json({message:'Cita creada exitosamente', id:result.insertId});
    });
};
const getCitasforId =(req,res) =>{
    const id= req.params.id;
    db.query('SELECT * FROM cita WHERE id=?', [id],(err,result)=> {
        if(err) return res.status(500).json({error: 'Error en la database'});
        if (result.length===0) return res.status(404).json({error:'Cita no encontrada'});
        res.json(result[0]);
    });
};
const putCita = (req,res) => {
    const id= req.params.id;
    const {fecha,cliente_id, mascota_id,servicio}= req.body;

    if (!fecha || !cliente_id || !mascota_id || !servicio) {
        return res.status(400).json({error:'Completar los campos obligatorios'});

    }
    const sql ='UPDATE cita SET fecha=?, cliente_id=?, mascota_id=?, servicio=? WHERE id=?';
    db.query(sql, [fecha,cliente_id, mascota_id, servicio], (err,result)=> {
        if(err) return res.status(500).json({error: 'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Cita no encontrada'});
        res.json({message:'Cita modificada exitosamente'});
    });
};
const deleteCita=(req,res) => {
    const id= req.params.id;
    const sql='DELETE FROM cita WHERE id=?';
    db.query(sql, [id], (err,result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows===0) return res.status(404).json({error: 'Cita no encontrada'});
        res.json({message: 'Cita eliminada con exito'});
    });
};
module.exports={
    getCitas,
    postCitas,
    getCitasforId,
    putCita,
    deleteCita
};
