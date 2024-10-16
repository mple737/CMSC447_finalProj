const express = require('express')
const router = express.Router({mergeParams: true})
const notesController = require('../controllers/notesController')

router.route('/')
    .post(notesController.createNewNote)
    .get(notesController.getAllNotes)
    .patch(notesController.updateNote)
    .delete(notesController.deleteNote)

module.exports = router