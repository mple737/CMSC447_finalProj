const {prisma, mongoose} = require('../prisma/clients')
const asyncHandler = require('express-async-handler')

// @desc Get all notes
// @route GET /tickets/:id/notes
// @access Private

const getAllNotes = asyncHandler(async(req, res) => {
    const { ticketId } = req.params

    if(!mongoose.isValidObjectId(ticketId)) {
        return res.status(400).json({message:"Invalid ObjectId"})
    }

    const notes = await prisma.note.findMany({
        where: {
            ticketId: ticketId,
        },
    })

    return res.json(notes)
})

// @desc Create new ticket
// @route POST /tickets
// @access Private

const createNewNote = asyncHandler(async(req, res) => {
    /* id String @id @default(auto()) @map("_id") @db.ObjectId
    userId String
    body String
    ticket Ticket @relation(fields: [id], references: [id])
    */
    const { ticketId } = req.params

    if(!mongoose.isValidObjectId(ticketId)) {
        return res.status(400).json({message:"Invalid ObjectId"})
    }

    const { userId, body } = req.body
    const ticket = await prisma.ticket.update({
        where: {
            id: ticketId
        },
        data: {
            notes: {
                create: {
                    userId,
                    body
                }
            }
        },
        include: {
            notes: true
        }
    })

    if(!ticket) {
        return res.status(400).json({message:"Invalid Request; Ticket does not exist"})
    }

    return res.status(201).json({message:`Note created in Ticket ${ticketId}`, ticket: ticket})
})

// @desc Update note
// @route PATCH /tickets/:id/notes
// @access Private

const updateNote = asyncHandler(async(req, res) => {

    const { ticketId } = req.params
    const { id, userId, body } = req.body

    if(!mongoose.isValidObjectId(ticketId)) {
        return res.status(400).json({message:"Invalid ObjectId"})
    }

    // Check for existing note
    const note = await prisma.note.findUnique({
        where: {
            id: id,
            ticketId: ticketId
        }
    })

    if(!note) {
        return res.status(400).json("Note does not exist")
    }

    // Update note
    const updatedNote = await prisma.note.update({
        where: {
            id: id,
        },
        data: {
            userId,
            body
        }
    })    

    return res.status(201).json({message:"Note updated", body: updatedNote})

})

// @desc Delete ticket
// @route GET /tickets
// @access Private

const deleteNote = asyncHandler(async(req, res) => {

    const { ticketId } = req.params
    const { id } = req.body
    
    if(!mongoose.isValidObjectId(ticketId)) {
        return res.status(400).json({message:"Invalid ObjectId"})
    }

    // Check for existing note
    const note = await prisma.note.findUnique({
        where: {
            id: id,
            ticketId: ticketId
        }
    })

    if(!note) {
        return res.status(400).json("Note does not exist")
    }

    // Delete note
    const deletedNote = await prisma.note.delete({
        where: {
            id: note.id
        }
    })
    

    return res.status(201).json({message:`Note ${deletedNote.id} removed`})

}) 

module.exports = { getAllNotes, createNewNote, updateNote, deleteNote }