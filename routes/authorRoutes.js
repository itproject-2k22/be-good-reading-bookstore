const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

router.get('/authors', authorController.getAllAuthors);
router.get('/authors/:id', authorController.getAuthorById);
router.post('/authors', authorController.createAuthor);
router.put('/authors/:id', authorController.updateAuthor);
router.delete('/authors/:id', authorController.deleteAuthor);

module.exports = router;
