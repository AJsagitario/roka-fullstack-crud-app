const db= require('../database')

const getForo=(req,res) => {
    db.query('SELECT * FROM foromensaje', (err,results)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        res.json(results);
    });
};

const postForo=(req,res) => {
    const {cliente_id, fecha, mensaje} = req.body;

    if(!cliente_id || !fecha || !mensaje) {
        return res.status(400).json({error:'Todos los campos son obligatorios'});

    }
    const sql='INSERT INTO foromensaje (cliente_id,fecha,mensaje) VALUES (?,?,?)';
    db.query(sql, [cliente_id,fecha,mensaje], (err,result)=>{
        if(err) return res.status(500).json({error:'Error al crear el foro'});
        res.status(201).json({message:'Mensaje registrada con exito',id:result.insertId});
    });
};
const getForoforId = (req,res) => {
    const id= req.params.id;
    db.query('SELECT * FROM foromensaje WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if (result.length===0) return res.status(404).json({error:'Foro no encontrada'});
        res.json(result[0]);
    });
};
const putForo=(req,res) => {
    const id= req.params.id;
    const {cliente_id,fecha,mensaje} = req.body;
    if(!cliente_id || !fecha || !mensaje) {
        return res.status(400).json({error: 'Completar los campos obligatoriamente'});
    }
    const sql='UPDATE foromensaje SET cliente_id=?,fecha=?,mensaje=? WHERE id=?';
    db.query(sql, [cliente_id,fecha,mensaje],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error:'Foro no encontrado'});
        res.json({message:'Foro actualizada'});
    });
};
const deleteForo=(req,res) => {
    const id=req.params.id;
    const sql='DELETE FROM foromensaje WHERE id=?';
    db.query(sql, [id], (err,result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Mensaje no encontrado'});
        res.json({message:'Mensaje eliminada'});
    });
};
module.exports={
    getForo,
    postForo,
    getForoforId,
    putForo,
    deleteForo
};