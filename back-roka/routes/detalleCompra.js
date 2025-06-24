const express = require('express')
const router = express.Router();
const ctlr = require('../controllers/detalleCompraCtlr')


router.get('/',ctlr.getDetalle)
router.get('/:id',ctlr.getDetalleforId)
router.post('/',ctlr.postDetalle)
router.put('/:id',ctlr.putDetale)
router.delete('/:id',ctlr.deteleDetalle)

module.exports=router