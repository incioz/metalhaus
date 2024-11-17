const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

// Define a schema and model
const DataSchema = new mongoose.Schema({
  name: String,
  value: Number,
});
const Data = mongoose.model('Data', DataSchema);

// Seed data
app.get('/seed', async (req, res) => {
  await Data.deleteMany({});
  await Data.insertMany([
    { name: 'Item 1', value: 10 },
    { name: 'Item 2', value: 20 },
    { name: 'Item 3', value: 30 },
  ]);
  res.send('Database seeded!');
});

// API route to fetch data
app.get('/api/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
