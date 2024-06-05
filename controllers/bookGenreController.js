const BookGenre = require('../models/bookGenre');

const getAllBooksGenres = async (req, res, next) => {
    try {
        const booksGenres = await BookGenre.getAllBooksGenres();
        res.json(booksGenres);
    } catch (err) {
        next(err);
    }
};

const getBookGenreById = async (req, res, next) => {
    try {
        const { genre_id, books_id } = req.params;
        const bookGenre = await BookGenre.getBookGenreById(genre_id, books_id);
        if (!bookGenre) {
            return res.status(404).json({ msg: 'Book Genre not found' });
        }
        res.json(bookGenre);
    } catch (err) {
        next(err);
    }
};

const createBookGenre = async (req, res, next) => {
    try {
        const bookGenre = await BookGenre.createBookGenre(req.body);
        res.json(bookGenre);
    } catch (err) {
        next(err);
    }
};

const updateBookGenre = async (req, res, next) => {
    try {
        const { genre_id, books_id } = req.params;
        const bookGenre = await BookGenre.updateBookGenre(genre_id, books_id, req.body);
        if (!bookGenre) {
            return res.status(404).json({ msg: 'Book Genre not found' });
        }
        res.json(bookGenre);
    } catch (err) {
        next(err);
    }
};

const deleteBookGenre = async (req, res, next) => {
    try {
        const { genre_id, books_id } = req.params;
        const bookGenre = await BookGenre.deleteBookGenre(genre_id, books_id);
        if (!bookGenre) {
            return res.status(404).json({ msg: 'Book Genre not found' });
        }
        res.json({ msg: 'Book Genre deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooksGenres,
    getBookGenreById,
    createBookGenre,
    updateBookGenre,
    deleteBookGenre,
};
