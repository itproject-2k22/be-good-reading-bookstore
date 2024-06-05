const express = require('express');
const promoController = require('../controllers/promoController');

const router = express.Router();

router.get('/promos', promoController.getAllPromos);
router.get('/promos/:id', promoController.getPromoById);
router.post('/promos', promoController.createPromo);
router.put('/promos/:id', promoController.updatePromo);
router.delete('/promos/:id', promoController.deletePromo);

module.exports = router;
