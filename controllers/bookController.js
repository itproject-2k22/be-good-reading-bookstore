const Book = require('../models/books');

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await Book.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
};

const createBook = async (req, res, next) => {
    try {
        const book = await Book.createBook(req.body);
        res.json(book);
    } catch (err) {
        next(err);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const book = await Book.updateBook(req.params.id, req.body);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.deleteBook(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json({ msg: 'Book deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
