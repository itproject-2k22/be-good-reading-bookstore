const GRB = require ('../models/grb');

const showAllBooks = async (req, res, next) => {
    try{
        const books = await GRB.showAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const showBooksRating = async (req, res, next) => {
    try{
        const books = await GRB.showBooksRating();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

const showAllReviews = async (req, res, next) =>{
    const {keyword} = req.query;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }
    try{
        const reviews = await GRB.showAllReviews(keyword);
        res.json(reviews)
    } catch (err) {
        next(err);
    }
}

const showAllWishlist = async (req, res, next) => {
    try{
        const wishlist = await GRB.showAllWishlist();
        res.json(wishlist);
    } catch (err) {
        next(err);
    }
};

const addWishlist = async (req, res, next) => {
    try{
        const wishlist = await GRB.addWishlist(req.body);
        res.json({ msg: 'add success', data: wishlist });
    } catch (err) {
        next(err);
    }
};

const deleteWishlist = async (req, res, next) => {
    try {
        const wishlist = await GRB.deleteWishlist(req.body);
        if (!wishlist) {
            return res.status(404).json({ msg: 'wishlist not found' });
        }
        res.json({ msg: 'wishlist deleted', data: wishlist });
    } catch (err) {
        next(err);
    }
};

const addReview = async (req, res, next) => {
    try {
        const review = await GRB.addReview(req.body);
        res.json({ msg: 'add success', data : review });
    } catch (err) {
        next(err);
    }
};

const updateReview = async (req, res, next) => {
    try {
        const review = await GRB.updateReview(req.body);
        if (!review) {
            return res.status(404).json({ msg: 'review not found' });
        }
        res.json({ msg: "update success", data: review});
    } catch (err) {
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const review = await GRB.deleteReview(req.body);
        if (!review) {
            return res.status(404).json({ msg: 'review not found' });
        }
        res.json({ msg: 'review deleted', data: review});
    } catch (err) {
        next(err);
    }
};

const addRecommendExistPublisher = async (req, res, next) => {
    try {
        const book = await GRB.addRecommendExistPublisher(req.body);
        res.json({msg: 'add success', data: book});
    } catch (err) {
        next(err);
    }
};

const addRecommendNewPublisher = async (req, res, next) => {
    try {
        const book = await GRB.addRecommendNewPublisher(req.body);
        res.json({ msg: 'add success' , data: book});
    } catch (err) {
        next(err);
    }
};


module.exports = {
    showAllBooks,
    showBooksRating,
    showAllReviews,
    showAllWishlist,
    addWishlist,
    deleteWishlist,
    addReview,
    updateReview,
    deleteReview,
    addRecommendExistPublisher,
    addRecommendNewPublisher,
};