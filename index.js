const express = require('express');
require('dotenv').config();
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const bookReleaseRoutes = require('./routes/bookReleaseRoutes');
const bookGenreRoutes = require('./routes/bookGenreRoutes');
const bookPromoRoutes = require('./routes/bookPromoRoutes');
const bookWarehouseRoutes = require('./routes/bookWarehouseRoutes');
const customerRoutes = require('./routes/customerRoutes');
const genreRoutes = require('./routes/genreRoutes');
const listAddressRoutes = require('./routes/listAddressRoutes');
const promoRoutes = require('./routes/promoRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const staffsRoutes = require('./routes/staffsRoutes');
const tagRoutes = require('./routes/tagRoutes');
const taggingRoutes = require('./routes/taggingRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/api', authorRoutes);
app.use('/api', bookRoutes);
app.use('/api', publisherRoutes);
app.use('/api', bookReleaseRoutes);
app.use('/api', bookGenreRoutes);
app.use('/api', bookPromoRoutes);
app.use('/api', bookWarehouseRoutes);
app.use('/api', customerRoutes);
app.use('/api', genreRoutes);
app.use('/api', listAddressRoutes);
app.use('/api', promoRoutes);
app.use('/api', reviewsRoutes);
app.use('/api', staffsRoutes);
app.use('/api', tagRoutes);
app.use('/api', taggingRoutes);
app.use('/api', warehouseRoutes);
app.use('/api', wishlistRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
