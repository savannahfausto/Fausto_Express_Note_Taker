const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (_req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (_req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (_req, res) => {
    fs.readFile('./db/db.json', function(err, data){
        if (err) throw err;
        const parsedData = JSON.parse(data);
        res.json(parsedData);
    })
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        
        fs.readFile('./db/db.json', function(err, data){
            if (err) throw err;
            const parsedData = JSON.parse(data);
            parsedData.push(newNote);
            const noteString = JSON.stringify(parsedData)

            fs.writeFile(`./db/db.json`, noteString, (err) => {
                if (err) throw err;
                res.json(parsedData)
            });
        })


    }

})

app.delete()
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });