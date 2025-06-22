const express = require('express');
const router = express.Router(); //para definir rutas
const ctlr = require('../controllers/clientCtlr');

router.get('/',ctlr.getClientes);
router.post('/', ctlr.postClientes);
router.get('/:id', ctlr.getClienteById);
router.put('/:id',ctlr.putCliente);


module.exports=router;
