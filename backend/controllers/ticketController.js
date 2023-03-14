const asyncHandler = require('express-async-handler');

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Deletes a single ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req,res) => {
    // Get the users tickets
    const user = await User.findById(req.user.id);

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    await ticket.remove();

    res.status(200).json({success:'True'});
});


// @desc Gets a single ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req,res) => {
    // Get the users tickets
    const user = await User.findById(req.user.id);

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(ticket);
});


// @desc Update a single ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req,res) => {
    // Get the users tickets
    const user = await User.findById(req.user.id);

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(401);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString()!==req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json(updatedTicket);
});


// @desc Gets users tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req,res) => {
    // Get the users tickets
    const user = await User.findById(req.user.id);
    const tickets = await Ticket.find({user:req.user.id});
    res.status(200).json(tickets);
});


// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req,res) => {
    // Get the users tickets
    const user = await User.findById(req.user.id);

    const {product,description} = req.body

    const ticket = await Ticket.create({
        product,
        description,
        user:req.user.id
    })

    res.status(201).json(ticket);
});

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    updateTicket,
    deleteTicket
}