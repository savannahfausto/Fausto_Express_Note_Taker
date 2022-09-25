const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

//get route for api/notes
router.get('/', (_req, res) => {
    readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});
//post route for api/notes
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        
        readAndAppend(newNote, './db/db.json', res);
        //res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }

})
//delete route for api/notes/:id
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result, res, noteId);
    });

});

module.exports = router;