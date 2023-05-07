const notesRouter = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a new note`);
    
    const { title, text } = req.body;
    console.log(title, text);

    if (title && text){
        console.info('both required fields are present in the POST request!')
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

module.exports = notesRouter;