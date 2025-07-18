const express = require('express')
const router = express.Router({mergeParams: true})
const ticketsController = require('../controllers/ticketsController')

router.route('/')
    .post(ticketsController.createNewTicket)
    .get(ticketsController.getAllTickets)
    .patch(ticketsController.updateTicket)
    .delete(ticketsController.deleteTicket)

module.exports = router