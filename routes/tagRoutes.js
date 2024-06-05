const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getTagById);
router.post('/tags', tagController.createTag);
router.put('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;
