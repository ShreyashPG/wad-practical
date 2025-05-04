const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'bookstoreDB';

app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('books');

        // Add a new book
        app.post('/books', async (req, res) => {
            const { title, author, price, genre } = req.body;
            const result = await collection.insertOne({ title, author, price, genre });
            res.status(201).json({ id: result.insertedId, message: 'Book added' });
        });

        // View all books
        app.get('/books', async (req, res) => {
            const books = await collection.find().toArray();
            res.json(books);
        });

        // Update a book
        app.put('/books/:id', async (req, res) => {
            const { title, author, price, genre } = req.body;
            const result = await collection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { title, author, price, genre } }
            );
            res.json({ modifiedCount: result.modifiedCount });
        });

        // Delete a book
        app.delete('/books/:id', async (req, res) => {
            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ deletedCount: result.deletedCount });
        });

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error(err);
    }
}

startServer();