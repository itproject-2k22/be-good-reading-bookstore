const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/wishlists', wishlistController.getAllWishlists);
router.get('/wishlists/customer/:customer_id', wishlistController.getWishlistByCustomerId);
router.get('/wishlists/books/:books_id', wishlistController.getBooksByWishlistId);
router.post('/wishlists', wishlistController.addToWishlist);
router.delete('/wishlists', wishlistController.removeFromWishlist);

module.exports = router;
