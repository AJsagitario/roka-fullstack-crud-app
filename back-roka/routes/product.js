const express= require('express');
const router= express.Router();
const ctlr = require('../controllers/productCtlr');

router.get('/',ctlr.getProduct)
router.get('/:id',ctlr.getProductforId)
router.post('/',ctlr.postProduct)
router.put('/:id',ctlr.putProducto)
router.delete('/:id',ctlr.deleteProduct)

module.exports=router;
