const express = require('express');
const router = express.Router();
const ctlr = require('../controllers/mascotCtlr');

router.get('/',ctlr.getMascot)
router.post('/',ctlr.postMascot)
router.get('/:id',ctlr.getMascotforId)
router.put('/:id',ctlr.putMascot)
router.delete('/:id',ctlr.deleteMascot)

module.exports=router;

