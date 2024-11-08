require('dotenv').config()
const express = require('express')
const path = require('path')
const { clerkClient, requireAuth } = require('@clerk/express')
const { isObjectBindingPattern } = require('typescript')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

const {prisma, mongoose} = require('./prisma/clients')

const app = express()
const PORT = process.env.PORT || 3500

app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// Index route
app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))

// Tickets route
app.use('/tickets/:organizationId', requireAuth(), require('./routes/ticketRoutes'))

// Single ticket by id
app.get('/tickets/:organizationId/:id', requireAuth(), async(req, res) => {
    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message:"Invalid Object ID"})
    }
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: id
        },
    })

    if(!ticket) {
        return res.status(400).json({message:"Ticket does not exist"})
    }

    res.json(ticket)
})

// Notes route
app.use('/tickets/:ticketId/notes', requireAuth(), require('./routes/noteRoutes'))

app.get('/users/:userId', requireAuth(), async(req, res) => {

    const {userId} = req.params

    const user = await clerkClient.users.getUser(userId)
    res.json(user)
})

// 404 Handling
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "views", "404.html"))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// Log Prisma MongoDB Errors and Querys
prisma.$on('error', (e) => {
    logEvents(`${e.error}`, 'dbLog.log')
})

prisma.$on('query', (e) => {
    logEvents(`${e.query}`, 'dbLog.log')
})

