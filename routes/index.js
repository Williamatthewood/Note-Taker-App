const express = require('express');

const notesRouter = require('./notes');

const app = express();

//pull in the notes routes to this central index and add /notes to each request
app.use('/notes', notesRouter);

module.exports = app;