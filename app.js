const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

bookRouter.route('/books')
    .get((req, res) => {
        const { query } = req;
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            return res.json(books);
        })
    });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
    res.send('YO PUEDO TODO');
});

app.get('/yavirac', (req, res) => {
    const response = { saludo: 'Soy Yavirac' }
    res.json(response);
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});