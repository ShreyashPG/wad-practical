const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'music';
const collectionName = 'songdetails';

app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // a) Create database 'music' (auto-created)
        // b) Create collection 'songdetails' (auto-created)

        // c) Insert array of 5 song documents
        app.get('/insertSongs', async (req, res) => {
            const songs = [
                { Songname: 'Song1', Film: 'Film1', Music_director: 'Director1', Singer: 'Singer1' },
                { Songname: 'Song2', Film: 'Film2', Music_director: 'Director2', Singer: 'Singer2' },
                { Songname: 'Song3', Film: 'Film3', Music_director: 'Director1', Singer: 'Singer3' },
                { Songname: 'Song4', Film: 'Film4', Music_director: 'Director3', Singer: 'Singer1' },
                { Songname: 'Song5', Film: 'Film5', Music_director: 'Director2', Singer: 'Singer4' }
            ];
            const result = await collection.insertMany(songs);
            res.json({ insertedCount: result.insertedCount });
        });

        // d) Display total count and list all documents in browser
        app.get('/songs', async (req, res) => {
            const count = await collection.countDocuments();
            const songs = await collection.find().toArray();
            res.send(`
                <h1>Total Songs: ${count}</h1>
                <table border="1">
                    <tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th></tr>
                    ${songs.map(song => `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td></tr>`).join('')}
                </table>
            `);
        });

        // e) List specified Music Director songs
        app.get('/songs/director/:director', async (req, res) => {
            const director = req.params.director;
            const songs = await collection.find({ Music_director: director }).toArray();
            res.send(`
                <h1>Songs by ${director}</h1>
                <table border="1">
                    <tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th></tr>
                    ${songs.map(song => `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td></tr>`).join('')}
                </table>
            `);
        });

        // f) List specified Music Director songs sung by specified Singer
        app.get('/songs/director/:director/singer/:singer', async (req, res) => {
            const { director, singer } = req.params;
            const songs = await collection.find({ Music_director: director, Singer: singer }).toArray();
            res.send(`
                <h1>Songs by ${director} sung by ${singer}</h1>
                <table border="1">
                    <tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th></tr>
                    ${songs.map(song => `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td></tr>`).join('')}
                </table>
            `);
        });

        // g) Delete a song by Songname
        app.delete('/songs/:songname', async (req, res) => {
            const songname = req.params.songname;
            const result = await collection.deleteOne({ Songname: songname });
            res.json({ deletedCount: result.deletedCount });
        });

        // h) Add a new song
        app.post('/songs', async (req, res) => {
            const { Songname, Film, Music_director, Singer } = req.body;
            const result = await collection.insertOne({ Songname, Film, Music_director, Singer });
            res.status(201).json({ id: result.insertedId, message: 'Song added' });
        });

        // i) List songs sung by specified Singer from specified Film
        app.get('/songs/singer/:singer/film/:film', async (req, res) => {
            const { singer, film } = req.params;
            const songs = await collection.find({ Singer: singer, Film: film }).toArray();
            res.send(`
                <h1>Songs by ${singer} in ${film}</h1>
                <table border="1">
                    <tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th></tr>
                    ${songs.map(song => `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td></tr>`).join('')}
                </table>
            `);
        });

        // j) Update a song by adding Actor and Actress
        app.put('/songs/:songname', async (req, res) => {
            const { Actor, Actress } = req.body;
            const result = await collection.updateOne(
                { Songname: req.params.songname },
                { $set: { Actor, Actress } }
            );
            res.json({ modifiedCount: result.modifiedCount });
        });

        // k) Display all songs with Actor and Actress in browser
        app.get('/songsWithCast', async (req, res) => {
            const songs = await collection.find({ Actor: { $exists: true }, Actress: { $exists: true } }).toArray();
            res.send(`
                <h1>Songs with Cast</h1>
                <table border="1">
                    <tr><th>Songname</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>
                    ${songs.map(song => `<tr><td>${song.Songname}</td><td>${song.Film}</td><td>${song.Music_director}</td><td>${song.Singer}</td><td>${song.Actor || 'N/A'}</td><td>${song.Actress || 'N/A'}</td></tr>`).join('')}
                </table>
            `);
        });

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error(err);
    }
}

startServer();