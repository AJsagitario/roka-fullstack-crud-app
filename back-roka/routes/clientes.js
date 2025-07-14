const express = require('express');
const router = express.Router(); //para definir rutas
const ctlr = require('../controllers/clientCtlr');

router.get('/',ctlr.getClientes);
router.post('/', ctlr.postClientes);
router.post('/login',ctlr.lgCli);
router.get('/:id', ctlr.getClienteById);
router.put('/:id',ctlr.putCliente);
router.delete('/:id',ctlr.deleteCliente)


module.exports=router;
