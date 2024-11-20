const { prisma } = require('../prisma/clients')
const { clerkClient } = require('@clerk/express')
const asyncHandler = require('express-async-handler')
// @desc Get all tickets
// @route GET /tickets
// @access Private

const getAllTickets = asyncHandler(async(req, res) => {

    const { organizationId }  = req.params

    const tickets = await prisma.ticket.findMany({
        where: {
            organizationId: organizationId
        },
        include: {
            notes: true
        }
    })
    return res.status(201).json(tickets)
})

// @desc Create new ticket
// @route POST /tickets
// @access Private

const createNewTicket = asyncHandler(async(req, res) => {

    const { organizationId }  = req.params

    const { title, body, userId, type, category, status, assignedToId } = req.body
    if( !title || !body || !userId) {
        
        return res.status(400).json({message: "Provide all required fields"})
    }

    const userName = (await clerkClient.users.getUser(userId)).fullName
    const assignedToName = null
    if(assignedToId) {
        assignedToName = await clerkClient.users.getUser(assignedToId).fullName
    }

    const ticket = await prisma.ticket.create({
        data: {
            organizationId : organizationId,
            title,
            body,
            userId,
            userName,
            type,
            category,
            status,
            assignedToId,
            assignedToName,
            notes: { create: [], },
        },
        include: {
            notes: true
        }
    })
    return res.status(201).json({message:"Ticket created", ticket: ticket})
})

// @desc Update ticket
// @route PATCH /tickets
// @access Private

const updateTicket = asyncHandler(async(req, res) => {
    const { organizationId }  = req.params

    const { id, title, body, contactId, type, category, status, assignedToName, assignedToId } = req.body
    
    const existingTicket = await prisma.ticket.findUnique({
        where: {
            organizationId: organizationId,
            id: id,
        },
    })

    if(!existingTicket) {
        return res.status(400).json({message: "Ticket does not exist"})
    }
    
    const userName = await clerkClient.users.getUser(existingTicket.userId).fullName


    const ticket = await prisma.ticket.update({
        where: {
            organizationId: organizationId,
            id: id
        },
        data: {
            title,
            body,
            userName,
            type,
            category,
            status,
            assignedToName,
            assignedToId
        }
    })

    return res.status(201).json({message:"Ticket updated", body: ticket})
})

// @desc Delete ticket
// @route GET /tickets
// @access Private

const deleteTicket = asyncHandler(async(req, res) => {
        const { organizationId }  = req.params

        const { id } = req.body

        const existingTicket = await prisma.ticket.findUnique({
            where: {
                id: id,
            },
        })

        if(!existingTicket) {
            return res.status(400).json({message: "Ticket does not exist"})
        }
        // Remove all notes

        const notes = await prisma.note.deleteMany({
            where: {
                ticketId: id
            }
        })

        // Remove ticket

        const ticket = await prisma.ticket.delete({
            where: {
                id: id,
            },
        })
        return res.status(201).json({message:"Ticket and related notes removed", body: [{ticket: ticket}, {notes: notes}]})

}) 

module.exports = { getAllTickets, createNewTicket, updateTicket, deleteTicket }