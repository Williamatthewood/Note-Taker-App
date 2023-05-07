const fs = require('fs');
const util = require('util');

//promisifying the readFile method
const readFromFile = util.promisify(fs.readFile);

//formatting and simplifying the writeFile fs method
const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => 
    err ? console.error(err) : console.info(`\nData written to ${destination}`))
}
//reads and parses the data, adds a new element from the request body, and then writes the updated array back to the db
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    })
}
//reads and parses the db, then uses the filter function to return a new array of data with all data EXCEPT the requested id
// after that, it writes over the old array with the new one with the deleted item removed. 
const readAndDelete = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            modifiedData = parsedData.filter((note) => note.id !== id);
            writeToFile(file, modifiedData);
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };