const express = require('express');
const formData = require('express-form-data');
const cors = require('cors');
const { Book } = require('./models');

/**
* Book object format:
* id: string
* title: string
* description: string
* authors: string
* favorite: string
* fileCover: string
* fileName: string
*/

/**
 * Routes:
 * POST: /api/user/login - authorisation
 * GET: /api/books - get all books
 * GET: /api/books/:id - get book with id
 * POST: /api/books - create book
 * PUT: /api/books/:id - edit book information
 * DELETE: /api/books/:id - delete book with id
 */

const store = {
    books: []
}

const app = express();

app.use(formData.parse());
app.use(cors());

app.post('/api/user/login', (req, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
})

app.post('/api/books/', (req, res) => {
    const { books } = store;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;

    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    );
    books.push(newBook);

    res.status(201).json(newBook);
});

app.get('/api/books/', (req, res) => {
    const { books } = store;
    if (books.length > 0) {
        res.json(books);
    } else {
        res.status(404).json(`No books`);

    }
});

app.get('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = books.findIndex(book => book.id === id);

    if (findId !== -1) {
        res.json(books[findId]);
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

app.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = books.findIndex(book => book.id === id);
    if (findId !== -1) {
        books[findId] = {
            ...books[findId],
            ...req.body,
        };
        res.json(books[findId]);
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = books.findIndex(book => book.id === id);

    if (findId !== -1) {
        books.splice(findId, 1);
        res.json(`ok. Book with index ${id} removed from library`);
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});