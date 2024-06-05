const Genre = require('../models/genre');

const getAllGenres = async (req, res, next) => {
    try {
        const genres = await Genre.getAllGenres();
        res.json(genres);
    } catch (err) {
        next(err);
    }
};

const getGenreById = async (req, res, next) => {
    try {
        const genre = await Genre.getGenreById(req.params.id);
        if (!genre) {
            return res.status(404).json({ msg: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        next(err);
    }
};

const createGenre = async (req, res, next) => {
    try {
        const genre = await Genre.createGenre(req.body);
        res.json(genre);
    } catch (err) {
        next(err);
    }
};

const updateGenre = async (req, res, next) => {
    try {
        const genre = await Genre.updateGenre(req.params.id, req.body);
        if (!genre) {
            return res.status(404).json({ msg: 'Genre not found' });
        }
        res.json(genre);
    } catch (err) {
        next(err);
    }
};

const deleteGenre = async (req, res, next) => {
    try {
        const genre = await Genre.deleteGenre(req.params.id);
        if (!genre) {
            return res.status(404).json({ msg: 'Genre not found' });
        }
        res.json({ msg: 'Genre deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
};
