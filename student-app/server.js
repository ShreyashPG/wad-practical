const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'student';
const collectionName = 'studentmarks';

app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // a) Create database 'student' (auto-created)
        // b) Create collection 'studentmarks' (auto-created)

        // c) Insert array of student documents
        app.get('/insertStudents', async (req, res) => {
            const students = [
                { Name: 'Student1', Roll_No: 1, WAD_Marks: 25, CC_Marks: 30, DSBDA_Marks: 20, CNS_Marks: 15, AI_Marks: 10 },
                { Name: 'Student2', Roll_No: 2, WAD_Marks: 20, CC_Marks: 25, DSBDA_Marks: 22, CNS_Marks: 18, AI_Marks: 12 },
                { Name: 'Student3', Roll_No: 3, WAD_Marks: 30, CC_Marks: 28, DSBDA_Marks: 25, CNS_Marks: 20, AI_Marks: 15 },
                { Name: 'Student4', Roll_No: 4, WAD_Marks: 18, CC_Marks: 22, DSBDA_Marks: 19, CNS_Marks: 17, AI_Marks: 11 },
                { Name: 'Student5', Roll_No: 5, WAD_Marks: 28, CC_Marks: 27, DSBDA_Marks: 24, CNS_Marks: 19, AI_Marks: 14 }
            ];
            const result = await collection.insertMany(students);
            res.json({ insertedCount: result.insertedCount });
        });

        // d) Display total count and list all documents in browser
        app.get('/students', async (req, res) => {
            const count = await collection.countDocuments();
            const students = await collection.find().toArray();
            res.send(`
                <h1>Total Students: ${count}</h1>
                <table border="1">
                    <tr><th>Name</th><th>Roll No</th><th>WAD</th><th>CC</th><th>DSBDA</th><th>CNS</th><th>AI</th></tr>
                    ${students.map(s => `<tr><td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td><td>${s.CC_Marks}</td><td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.AI_Marks}</td></tr>`).join('')}
                </table>
            `);
        });

        // e) List students with DSBDA > 20 in browser
        app.get('/students/dsbdaAbove20', async (req, res) => {
            const students = await collection.find({ DSBDA_Marks: { $gt: 20 } }).toArray();
            res.send(`
                <h1>Students with DSBDA > 20</h1>
                <ul>${students.map(s => `<li>${s.Name}</li>`).join('')}</ul>
            `);
        });

        // f) Update specified student's marks by 10
        app.put('/students/:rollNo', async (req, res) => {
            const rollNo = parseInt(req.params.rollNo);
            const result = await collection.updateOne(
                { Roll_No: rollNo },
                { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10 } }
            );
            res.json({ modifiedCount: result.modifiedCount });
        });

        // g) List students with all marks > 25 in browser
        app.get('/students/allAbove25', async (req, res) => {
            const students = await collection.find({
                WAD_Marks: { $gt: 25 },
                CC_Marks: { $gt: 25 },
                DSBDA_Marks: { $gt: 25 },
                CNS_Marks: { $gt: 25 },
                AI_Marks: { $gt: 25 }
            }).toArray();
            res.send(`
                <h1>Students with all marks > 25</h1>
                <ul>${students.map(s => `<li>${s.Name}</li>`).join('')}</ul>
            `);
        });

        // h) List students with Maths (WAD) and Science (CNS) < 40 in browser
        app.get('/students/lowMathsScience', async (req, res) => {
            const students = await collection.find({
                WAD_Marks: { $lt: 40 },
                CNS_Marks: { $lt: 40 }
            }).toArray();
            res.send(`
                <h1>Students with WAD and CNS < 40</h1>
                <ul>${students.map(s => `<li>${s.Name}</li>`).join('')}</ul>
            `);
        });

        // i) Remove specified student by Roll_No
        app.delete('/students/:rollNo', async (req, res) => {
            const rollNo = parseInt(req.params.rollNo);
            const result = await collection.deleteOne({ Roll_No: rollNo });
            res.json({ deletedCount: result.deletedCount });
        });

        // j) Display students in tabular format (same as d)

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error(err);
    }
}

startServer();