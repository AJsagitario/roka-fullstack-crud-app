const db= require('../database')

const getCompra=(req,res) => {
    db.query('SELECT * FROM compra', (err,results)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        res.json(results);
    });
};

const postCompra=(req,res) => {
    const {cliente_id, fecha, tipoDoc} = req.body;

    if(!cliente_id || !fecha || !tipoDoc) {
        return res.status(400).json({error:'Todos los campos son obligatorios'});

    }
    const sql='INSERT INTO compra (cliente_id,fecha,tipoDoc) VALUES (?,?,?)';
    db.query(sql, [cliente_id,fecha,tipoDoc], (err,result)=>{
        if(err) return res.status(500).json({error:'Error al crear la compra'});
        res.status(201).json({message:'Compra registrada con exito',id:result.insertId});
    });
};
const getCompraforId = (req,res) => {
    const id= req.params.id;
    db.query('SELECT * FROM compra WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if (result.length===0) return res.status(404).json({error:'Compra no encontrada'});
        res.json(result[0]);
    });
};
const putCompra=(req,res) => {
    const id= req.params.id;
    const {cliente_id,fecha,tipoDoc} = req.body;
    if(!cliente_id || !fecha || !tipoDoc) {
        return res.status(400).json({error: 'Completar los campos obligatoriamente'});
    }
    const sql='UPDATE compra SET cliente_id=?,fecha=?,tipoDoc=? WHERE id=?';
    db.query(sql, [cliente_id,fecha,tipoDoc],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error:'Compra no encontrada'});
        res.json({message:'Compra actualizada'});
    });
};
const deteleCompra=(req,res) => {
    const id=req.params.id;
    const sql='DELETE FROM compra WHERE id=?';
    db.query(sql, [id], (err,result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Compra no encontrada'});
        res.json({message:'Compra eliminada'});
    });
};
module.exports={
    getCompra,
    postCompra,
    getCompraforId,
    putCompra,
    deteleCompra
}