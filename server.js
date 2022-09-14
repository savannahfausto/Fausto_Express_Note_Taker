const express = require('express');
const path = require('path');
const fs = require('fs');

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

// app.post('/notes', (req, res) =>)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });