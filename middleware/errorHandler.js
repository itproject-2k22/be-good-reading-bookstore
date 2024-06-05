const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server Error');
};

module.exports = errorHandler;
