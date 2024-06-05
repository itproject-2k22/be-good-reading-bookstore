const express = require('express');
const staffsController = require('../controllers/staffsController');

const router = express.Router();

router.get('/staffs', staffsController.getAllStaffs);
router.get('/staffs/:id', staffsController.getStaffById);
router.post('/staffs', staffsController.createStaff);
router.put('/staffs/:id', staffsController.updateStaff);
router.delete('/staffs/:id', staffsController.deleteStaff);

module.exports = router;
