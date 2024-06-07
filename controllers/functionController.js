const CustomF = require('../models/function');

const showAllBooks = async (req, res, next) => {
    try {
        const books = await CustomF.showAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const showBooksRating = async (req, res, next) => {
    try {
        const books = await CustomF.showBooksRating();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const showAllReviews = async (req, res, next) => {
    try {
        const books = await CustomF.showAllReviews();
        res.json(books);
    } catch (err) {
        next(err);
    }
};
const showAllWishlist = async (req, res, next) => {
    try {
        const books = await CustomF.showAllWishlist();
        res.json(books);
    } catch (err) {
        next(err);
    }
};


const addReview = async (req, res, next) => {
    try {
        const review = await CustomF.addReview(req.body);
        res.json(review);
    } catch (err) {
        next(err);
    }
};

const updateReview = async (req, res, next) => {
    try {
        const review = await CustomF.updateReview(req.body);
        if (!review) {
            return res.status(404).json({ msg: 'review not found' });
        }
        res.json(review);
    } catch (err) {
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const review = await CustomF.deleteReview(req.params.id);
        if (!review) {
            return res.status(404).json({ msg: 'review not found' });
        }
        res.json({ msg: 'review deleted' });
    } catch (err) {
        next(err);
    }
};

const addBookExistPublisher = async (req, res, next) => {
    try {
        const book = await Book.createBookNewPublisher(req.body);
        res.json(book);
    } catch (err) {
        next(err);
    }
};

const addBookNewPublisher = async (req, res, next) => {
    try {
        const book = await Book.createBookNewPublisher(req.body);
        res.json(book);
    } catch (err) {
        next(err);
    }
};


module.exports = {
    showAllBooks,
    showBooksRating,
    showAllReviews,
    addReview,
    updateReview,
    deleteReview,
    addBookExistPublisher,
    addBookNewPublisher,
    showAllWishlist,
};
