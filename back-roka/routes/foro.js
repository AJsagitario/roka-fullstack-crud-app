const express = require('express')
const router = express.Router();
const ctlr = require('../controllers/ForoMensajeCtlr')


router.get('/',ctlr.getForo)
router.get('/:id',ctlr.getForoforId)
router.post('/',ctlr.postForo)
router.put('/:id',ctlr.putForo)
router.delete('/:id',ctlr.deleteForo)

module.exports=router