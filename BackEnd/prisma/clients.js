const { PrismaClient } = require('@prisma/client')
const mongoose = require('mongoose') 
const prisma = new PrismaClient({
    // Prisma Client settings
    log: [
        {
            emit: 'event',
            level: 'error'
        },
        {
            emit: 'event',
            level: 'query'
        }
    ]
})

module.exports = { prisma, mongoose }