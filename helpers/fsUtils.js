const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content, res, noteId) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    res.json(noteId ? `Item ${noteId} has been deleted 🗑️` : 'Message Added');
  }
  );

const readAndAppend = (content, file, res) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData, res);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
