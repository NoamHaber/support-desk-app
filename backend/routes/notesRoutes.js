const express = require('express')

const router = express()

const { protect } = require('../middleware/authMiddleware');

const { getNotes, createNote } = require('../controllers/notesController');

router.route('/').get(protect,getNotes).post(protect, createNote);

module.exports=router