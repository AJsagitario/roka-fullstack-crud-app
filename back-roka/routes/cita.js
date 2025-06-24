const express = require('express')
const router = express.Router();
const ctlr = require('../controllers/citaCtlr');

router.get('/',ctlr.getCitas)
router.get('/:id',ctlr.getCitasforId)
router.post('/',ctlr.postCitas)
router.put('/:id',ctlr.putCita)
router.delete('/:id',ctlr.deleteCita)

module.exports=router