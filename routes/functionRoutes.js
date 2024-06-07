const express = require('express');
const CustomF = require('../controllers/functionController');

const router = express.Router();
router.get('/function/books', CustomF.showAllBooks);
router.get('/function/reviews', CustomF.showAllReviews);
router.get('/function/ratings', CustomF.showBooksRating);
router.get('/function/wishlist', CustomF.showAllWishlist);
router.post('/function/reviews', CustomF.addReview);
router.put('/function/reviews', CustomF.updateReview);
router.delete('/function/reviews/:id', CustomF.deleteReview);
router.post('function/books/exist', CustomF.addBookExistPublisher);
router.post('function/books/new', CustomF.addBookExistPublisher);
module.exports = router;
