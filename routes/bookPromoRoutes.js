const express = require('express');
const bookPromoController = require('../controllers/bookPromoController');

const router = express.Router();

router.get('/books-promos', bookPromoController.getAllBooksPromos);
router.get('/books-promos/:books_id/:promo_id', bookPromoController.getBookPromoById);
router.post('/books-promos', bookPromoController.createBookPromo);
router.put('/books-promos/:books_id/:promo_id', bookPromoController.updateBookPromo);
router.delete('/books-promos/:books_id/:promo_id', bookPromoController.deleteBookPromo);

module.exports = router;
