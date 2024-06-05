const BookRelease = require('../models/bookRelease');

const getAllBookReleases = async (req, res, next) => {
    try {
        const bookReleases = await BookRelease.getAllBookReleases();
        res.json(bookReleases);
    } catch (err) {
        next(err);
    }
};

const getBookReleaseById = async (req, res, next) => {
    try {
        const { book_id, author_id } = req.params;
        const bookRelease = await BookRelease.getBookReleaseById(book_id, author_id);
        if (!bookRelease) {
            return res.status(404).json({ msg: 'Book Release not found' });
        }
        res.json(bookRelease);
    } catch (err) {
        next(err);
    }
};

const createBookRelease = async (req, res, next) => {
    try {
        const bookRelease = await BookRelease.createBookRelease(req.body);
        res.json(bookRelease);
    } catch (err) {
        next(err);
    }
};

const updateBookRelease = async (req, res, next) => {
    try {
        const { book_id, author_id } = req.params;
        const bookRelease = await BookRelease.updateBookRelease(book_id, author_id, req.body);
        if (!bookRelease) {
            return res.status(404).json({ msg: 'Book Release not found' });
        }
        res.json(bookRelease);
    } catch (err) {
        next(err);
    }
};

const deleteBookRelease = async (req, res, next) => {
    try {
        const { book_id, author_id } = req.params;
        const bookRelease = await BookRelease.deleteBookRelease(book_id, author_id);
        if (!bookRelease) {
            return res.status(404).json({ msg: 'Book Release not found' });
        }
        res.json({ msg: 'Book Release deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBookReleases,
    getBookReleaseById,
    createBookRelease,
    updateBookRelease,
    deleteBookRelease,
};
