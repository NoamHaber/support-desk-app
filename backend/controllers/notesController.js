const asyncHandler = require('express-async-handler');

const Ticket = require('../models/ticketModel')
const Notes = require('../models/notesModel')

// @desc Gets tickets notes
// @route GET /api/notes 
// @access Private
const getNotes = asyncHandler(async (req,res) => {
    let reqId=req.rawHeaders[15].split('/')[4];
    const notes = await Notes.find({ticket:reqId});
    res.status(200).json(notes);
});

// @desc Create new note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req,res) => {

    let reqId=req.rawHeaders[15].split('/')[4];
    
    const {content,author,id} = req.body

    const note = await Notes.create({
        content,
        author,
        ticket:id
    })

    res.status(201).json(note);
});

module.exports = {
    getNotes,
    createNote
}