const Author = require('../models/author');

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await Author.getAllAuthors();
        res.json(authors);
    } catch (err) {
        next(err);
    }
};

const getAuthorById = async (req, res, next) => {
    try {
        const author = await Author.getAuthorById(req.params.id);
        if (!author) {
            return res.status(404).json({ msg: 'Author not found' });
        }
        res.json(author);
    } catch (err) {
        next(err);
    }
};

const createAuthor = async (req, res, next) => {
    try {
        const author = await Author.createAuthor(req.body);
        res.json(author);
    } catch (err) {
        next(err);
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        const author = await Author.updateAuthor(req.params.id, req.body);
        if (!author) {
            return res.status(404).json({ msg: 'Author not found' });
        }
        res.json(author);
    } catch (err) {
        next(err);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.deleteAuthor(req.params.id);
        if (!author) {
            return res.status(404).json({ msg: 'Author not found' });
        }
        res.json({ msg: 'Author deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
