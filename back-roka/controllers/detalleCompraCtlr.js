const db= require('../database')

const getDetalle=(req,res) => {
    db.query('SELECT * FROM detallecompra', (err,results)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        res.json(results);
    });
};

const postDetalle=(req,res) => {
    const {compra_id,producto_id, cantidad, sun_total} = req.body;

    if(!compra_id || !producto_id || !cantidad || !sun_total) {
        return res.status(400).json({error:'Todos los campos son obligatorios'});

    }
    const sql='INSERT INTO detallecompra (compra_id,producto_id,cantidad,sun_total) VALUES (?,?,?,?)';
    db.query(sql, [compra_id,producto_id,cantidad,sun_total], (err,result)=>{
        if(err) return res.status(500).json({error:'Error al crear el detalle'});
        res.status(201).json({message:'Detalle registrada con exito',id:result.insertId});
    });
};
const getDetalleforId = (req,res) => {
    const id= req.params.id;
    db.query('SELECT * FROM detallecompra WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if (result.length===0) return res.status(404).json({error:'Detalle no encontrada'});
        res.json(result[0]);
    });
};
const putDetalle=(req,res) => {
    const id= req.params.id;
    const {compra_id,producto_id, cantidad, sun_total} = req.body;
    if(!compra_id || !producto_id || !cantidad || !sun_total) {
        return res.status(400).json({error: 'Completar los campos obligatoriamente'});
    }
    const sql='UPDATE detallecompra SET compra_id=?,producto_id=?,cantidad=?,sun_total=? WHERE id=?';
    db.query(sql, [compra_id,producto_id,cantidad,sun_total],(err,result)=>{
        if(err) return res.status(500).json({error:'Error en la database'});
        if(result.affectedRows===0) return res.status(400).json({error:'Detalle no encontrada'});
        res.json({message:'Detalle actualizada'});
    });
};
const deleteDetalle=(req,res) => {
    const id=req.params.id;
    const sql='DELETE FROM detallecompra WHERE id=?';
    db.query(sql, [id], (err,result) => {
        if(err) return res.status(500).json({error: 'Error al eliminar'});
        if(result.affectedRows===0) return res.status(400).json({error: 'Detalle no encontrada'});
        res.json({message:'Detalle eliminada'});
    });
};
module.exports={
    getDetalle,
    postDetalle,
    getDetalleforId,
    putDetalle,
    deleteDetalle
};