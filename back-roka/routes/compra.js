const express = require('express');
const router= express.Router();
const ctlr = require('../controllers/compraCtlr')

router.get('/',ctlr.getCompra)
router.get('/:id',ctlr.getCompraforId)
router.post('/',ctlr.postCompra)
router.put('/:id',ctlr.putCompra)
router.delete('/:id',ctlr.deteleCompra)

module.exports=router;