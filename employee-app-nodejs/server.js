const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3000;
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'employeeDB';

app.use(express.json());

async function startServer() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('employees');

        // Add a new employee
        app.post('/employees', async (req, res) => {
            const { name, department, designation, salary, joiningDate } = req.body;
            const result = await collection.insertOne({ name, department, designation, salary, joiningDate: new Date(joiningDate) });
            res.status(201).json({ id: result.insertedId, message: 'Employee added' });
        });

        // View all employees
        app.get('/employees', async (req, res) => {
            const employees = await collection.find().toArray();
            res.json(employees);
        });

        // Update an employee
        app.put('/employees/:id', async (req, res) => {
            const { name, department, designation, salary, joiningDate } = req.body;
            const result = await collection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { name, department, designation, salary, joiningDate: new Date(joiningDate) } }
            );
            res.json({ modifiedCount: result.modifiedCount });
        });

        // Delete an employee
        app.delete('/employees/:id', async (req, res) => {
            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
            res.json({ deletedCount: result.deletedCount });
        });

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (err) {
        console.error(err);
    }
}

startServer();