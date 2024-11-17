const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/shop_database')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// API Routes
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/favorites', async (req, res) => {
  // Implement favorites logic
});

app.get('/api/validate-token', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

app.get('/api/seed-products', async (req, res) => {
  try {
    // Verify MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    const products = await Product.insertMany([
      {
        name: 'Product 1',
        price: 29.99,
        description: 'This is product 1 description',
        image: 'https://via.placeholder.com/150'
      },
      {
        name: 'Product 2',
        price: 39.99,
        description: 'This is product 2 description',
        image: 'https://via.placeholder.com/150'
      },
      {
        name: 'Product 3',
        price: 49.99,
        description: 'This is product 3 description',
        image: 'https://via.placeholder.com/150'
      }
    ]);

    res.json({ message: 'Products seeded successfully', products });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({ 
      message: 'Error seeding products', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
