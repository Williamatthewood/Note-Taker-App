const notesRouter = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`)
})

module.exports = notesRouter;