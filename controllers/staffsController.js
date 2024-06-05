const Staffs = require('../models/staffs');

const getAllStaffs = async (req, res, next) => {
    try {
        const staffs = await Staffs.getAllStaffs();
        res.json(staffs);
    } catch (err) {
        next(err);
    }
};

const getStaffById = async (req, res, next) => {
    try {
        const staff = await Staffs.getStaffById(req.params.id);
        if (!staff) {
            return res.status(404).json({ msg: 'Staff not found' });
        }
        res.json(staff);
    } catch (err) {
        next(err);
    }
};

const createStaff = async (req, res, next) => {
    try {
        const staff = await Staffs.createStaff(req.body);
        res.json(staff);
    } catch (err) {
        next(err);
    }
};

const updateStaff = async (req, res, next) => {
    try {
        const staff = await Staffs.updateStaff(req.params.id, req.body);
        if (!staff) {
            return res.status(404).json({ msg: 'Staff not found' });
        }
        res.json(staff);
    } catch (err) {
        next(err);
    }
};

const deleteStaff = async (req, res, next) => {
    try {
        const staff = await Staffs.deleteStaff(req.params.id);
        if (!staff) {
            return res.status(404).json({ msg: 'Staff not found' });
        }
        res.json({ msg: 'Staff deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllStaffs,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
};
