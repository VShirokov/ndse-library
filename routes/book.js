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
    books: [
        {
            id: '123456987542',
            title: 'An American Tragedy',
            description: 'The naturalist author Theodore Dreiser was obsessed with true crime, keeping track of articles and cases in the early 20th century. The product of this obsession was his 1925 novel, “An American Tragedy”, based on a true crime story from New York’s Adirondack Mountains region that Dreiser followed. This novel was one of Dreiser’s most successful works and has often been hailed as his masterpiece.',
            authors: 'Theodore Dreiser'
        },
        {
            id: '123456u988787878778',
            title: 'The Time Machine',
            description: 'The Time Machine is a science fiction novella by H. G. Wells, published in 1895 and written as a frame narrative. The work is generally credited with the popularization of the concept of time travel by using a vehicle or device to travel purposely and selectively forward or backward through time.',
            authors: 'Herbert George Wells'
        }
    ]
}

const getBookById = id => store.books.findIndex(book => book.id === id);

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Add book',
        book: {}
    });
});

router.post('/create', fileMiddleware.single('fileBook'), (req, res) => {
    const { books } = store;
    const {
        file: {
            originalname,
            path,
        } = {},
        body: {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        }
    } = req;
    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName ? fileName : originalname,
        path
    );
    books.push(newBook);

    res.redirect('/books');
});

router.get('/', (req, res) => {
    const { books } = store;
    res.render("books/index", {
        title: 'All books',
        books: books,
    });
});

router.get('/view/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);
    if (findId !== -1) {
        res.render("books/view", {
            title: `Detail book page - ${books[findId].title}`,
            book: books[findId],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);

    if (findId !== -1) {
        res.render("books/update", {
            title: `Update book information - ${books[findId].title}`,
            book: books[findId],
        });
    } else {
        res.status(404).redirect('/404');
    }
});


router.post('/update/:id', fileMiddleware.single('fileBook'), (req, res) => {
    const { books } = store;
    const {
        params: {
            id
        },
        body,
    } = req;
    const findId = getBookById(id);
    if (findId !== -1) {
        books[findId] = {
            ...books[findId],
            ...body,
        };
        if (req.file) {
            const { file: { originalname, path } } = req;
            books[findId] = {
                ...books[findId],
                ...body,
                fileName: body.fileName ? body.fileName : originalname,
                fileBook: path
            };
        }
        res.redirect(`/books/view/${books[findId].id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const findId = getBookById(id);

    if (findId !== -1) {
        books.splice(findId, 1);
        res.redirect('/books');
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/download/:id', (req, res) => {
    const { params: { id } } = req;
    const findId = getBookById(id);
    if (findId !== -1) {
        const { books } = store;
        const { fileName, fileBook } = books[findId];
        res.download(path.join(__dirname, '..', fileBook), fileName, err => {
            if (err) {
                res.status(404).redirect('/404');
            }
        });
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;
