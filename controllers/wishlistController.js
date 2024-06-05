const Wishlist = require('../models/wishlist');

const getAllWishlists = async (req, res, next) => {
    try {
        const wishlists = await Wishlist.getAllWishlists();
        res.json(wishlists);
    } catch (err) {
        next(err);
    }
};

const getWishlistByCustomerId = async (req, res, next) => {
    try {
        const wishlists = await Wishlist.getWishlistByCustomerId(req.params.customer_id);
        res.json(wishlists);
    } catch (err) {
        next(err);
    }
};

const getBooksByWishlistId = async (req, res, next) => {
    try {
        const wishlists = await Wishlist.getBooksByWishlistId(req.params.books_id);
        res.json(wishlists);
    } catch (err) {
        next(err);
    }
};

const addToWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.addToWishlist(req.body);
        res.json(wishlist);
    } catch (err) {
        next(err);
    }
};

const removeFromWishlist = async (req, res, next) => {
    try {
        const { customer_id, books_id } = req.body;
        const result = await Wishlist.removeFromWishlist(customer_id, books_id);
        if (!result) {
            return res.status(404).json({ msg: 'Wishlist item not found' });
        }
        res.json({ msg: 'Item removed from wishlist' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllWishlists,
    getWishlistByCustomerId,
    getBooksByWishlistId,
    addToWishlist,
    removeFromWishlist,
};
