const notesRouter = require('express').Router();
// encapsulated file writing functions 
const { readFromFile, readAndAppend, writeToFile, readAndDelete } = require('../helpers/fsUtils');
//third party package for random id generation
const { v4: uuidv4 } = require('uuid');
const db = './db/db.json';

//GET route for reading data from the db.json file, uses readFromFile method from fsUtils
notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile(db).then((data) => res.json(JSON.parse(data)));
})

//POST route for writing data to the db.json file, uses readAndAppend from fsUtils
notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to submit a new note`);
    
    // take the 2 elements from the request body and destructure them
    const { title, text } = req.body;
    console.log(title, text);

    // if the note has both parts, structure a new note with a new random id and add it to the db by 
    // reading the db information, pushing the newNote as an entry in the array, and writing over with the new version of the data
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
        // if successful, send the response
        res.json(response);
    } else { // send an error
        res.json('Error in posting note');
    }
})

//DELETE route, uses the readAndDelete function from fsUtils
notesRouter.delete('/:id', (req, res) => {
    const requestedId = req.params.id;

    // if the item has an id, then read the database, return all elements EXCEPT the note with that id, and then write the updated array to file
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