const express = require('express');
const GRB = require('../controllers/grbController');
const router = express.Router();

router.get('/grb/books', GRB.showAllBooks);

router.get('/grb/ratings', GRB.showBooksRating);

router.get('/grb/wishlist', GRB.showAllWishlist);
router.post('/grb/wishlist', GRB.addWishlist);
router.delete('/grb/wishlist', GRB.deleteWishlist);

router.get('/grb/review', GRB.showAllReviews);
router.post('/grb/review', GRB.addReview);
router.put('/grb/review', GRB.updateReview);
router.delete('/grb/review', GRB.deleteReview);

router.post('/grb/recommend/exist', GRB.addRecommendExistPublisher);
router.post('/grb/recommend/new', GRB.addRecommendNewPublisher);

module.exports = router;