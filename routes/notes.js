const notesRouter = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const db = './db/db.json';


notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile(db).then((data) => res.json(JSON.parse(data)));
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

        readAndAppend(newNote, db);

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note');
    }
})

notesRouter.delete('/:id', (req, res) => {
    const requestedId = req.params.id;

    if(requestedId){
        readAndDelete(requestedId, db);

        const response = {
            status: 'successfully deleted note by id',
            body: requestedId,
        }

        res.json(response);
    } else {
        res.json('Error in deleting');
    }

    
})

module.exports = notesRouter;