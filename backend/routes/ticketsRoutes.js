const express = require('express')

const router = express()

const { protect } = require('../middleware/authMiddleware');

const { getTicket ,getTickets ,createTicket,deleteTicket,updateTicket } = require('../controllers/ticketController')

router.route('/').get(protect,getTickets).post(protect,createTicket);
router.route('/:id').get(protect, getTicket).delete(protect,deleteTicket).put(protect,updateTicket);

module.exports = router;
