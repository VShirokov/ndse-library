const express = require('express');
const router = express.Router();
const path = require('path');
const { Book } = require('../models');
const fileMiddleware = require('../middleware/file');

/**
 * Book object format:
 * id: string
 * title: string
 * description: string
 * authors: string
 * favorite: string
 * fileCover: string
 * fileName: string
 * fileBook: string
 */

const store = {
    books: []
}

const getBookById = id => store.books.findIndex(book => book.id === id);

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    const { books } = store;
    if (books.length > 0) {
        res.json(books);
    } else {
        res.status(404).json(`No books`);

    }
});

router.get('/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);

    if (findId !== -1) {
        res.json(books[findId]);
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

router.put('/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);
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

router.delete('/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);

    if (findId !== -1) {
        books.splice(findId, 1);
        res.json(`ok. Book with index ${id} removed from library`);
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

router.post('/:id/upload', fileMiddleware.single('book'), (req, res) => {
    const { params: { id } } = req;
    const findId = getBookById(id);
    if (findId !== -1) {
        if (req.file) {
            const { books } = store;
            const { file: { originalname, path } } = req;
            console.log(path);
            books[findId] = {
                ...books[findId],
                fileName: originalname,
                fileBook: path
            };
            res.json(books[findId]);
        } else {
            res.json(null);
        }
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }

});

router.get('/:id/download', (req, res) => {
    const { params: { id } } = req;
    const findId = getBookById(id);
    if (findId !== -1) {
        const { books } = store;
        const { fileName, fileBook } = books[findId];
        res.download(path.join(__dirname, '..', fileBook), fileName, err => {
            if (err) {
                res.status(404).json();
            }
        });
    } else {
        res.status(404).json(`Book with index ${id} not found`);
    }
});

module.exports = router;
