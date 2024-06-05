const BookPromo = require('../models/bookPromo');

const getAllBooksPromos = async (req, res, next) => {
    try {
        const booksPromos = await BookPromo.getAllBooksPromos();
        res.json(booksPromos);
    } catch (err) {
        next(err);
    }
};

const getBookPromoById = async (req, res, next) => {
    try {
        const { books_id, promo_id } = req.params;
        const bookPromo = await BookPromo.getBookPromoById(books_id, promo_id);
        if (!bookPromo) {
            return res.status(404).json({ msg: 'Book Promo not found' });
        }
        res.json(bookPromo);
    } catch (err) {
        next(err);
    }
};

const createBookPromo = async (req, res, next) => {
    try {
        const bookPromo = await BookPromo.createBookPromo(req.body);
        res.json(bookPromo);
    } catch (err) {
        next(err);
    }
};

const updateBookPromo = async (req, res, next) => {
    try {
        const { books_id, promo_id } = req.params;
        const bookPromo = await BookPromo.updateBookPromo(books_id, promo_id, req.body);
        if (!bookPromo) {
            return res.status(404).json({ msg: 'Book Promo not found' });
        }
        res.json(bookPromo);
    } catch (err) {
        next(err);
    }
};

const deleteBookPromo = async (req, res, next) => {
    try {
        const { books_id, promo_id } = req.params;
        const bookPromo = await BookPromo.deleteBookPromo(books_id, promo_id);
        if (!bookPromo) {
            return res.status(404).json({ msg: 'Book Promo not found' });
        }
        res.json({ msg: 'Book Promo deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooksPromos,
    getBookPromoById,
    createBookPromo,
    updateBookPromo,
    deleteBookPromo,
};
