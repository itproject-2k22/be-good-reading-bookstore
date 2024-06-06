const pool = require('../config/db');

const getAllBooks = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBookById = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books WHERE id = $1', [id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBook = async (book) => {
    const { id, title, pages, publisher, price } = book;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO books (id, title, pages, publisher, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, pages, publisher, price]
        );
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateBook = async (id, book) => {
    const { title, pages, publisher, price } = book;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE books SET title = $1, pages = $2, publisher = $3, price = $4 WHERE id = $5 RETURNING *',
            [title, pages, publisher, price, id]
        );
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const deleteBook = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBookNewPublisher = async (book) =>{
    const { id, title, pages, publisher, price, name, city, country, telephone} = book;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'INSERT INTO publishers (id, name, city, country, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [publisher, name, city, country, telephone]
        );
        const bookResult = await client.query(
            'INSERT INTO books (id, title, pages, publisher, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, pages, publisher, price]
        );
        await client.query('COMMIT');
        return bookResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    createBookNewPublisher,
};