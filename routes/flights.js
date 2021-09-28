var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:id', flightsCtrl.show)
router.get('/:id/tickets', flightsCtrl.newTicket)
router.get('/')


router.post('/', flightsCtrl.create)
router.post('/:id/destinations', flightsCtrl.addDest)
router.post('/:id/tickets', flightsCtrl.buyTicket)



module.exports = router;
