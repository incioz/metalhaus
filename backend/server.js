const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

mongoose.connect('mongodb://127.0.0.1:27017/shop_database')
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Product Schema
const ProductSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  productImage: String
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
        productName: "purple pearl chainmail choker",
        price: 35.0,
        productImage: "http://localhost:5000/images/1.jpeg"
      },
      {
        productName: "silver pearl chainmail choker",
        price: 35.0,
        productImage: "http://localhost:5000/images/2.jpeg"
      },
      {
        productName: "beaded necklace",
        price: 25.0,
        productImage: "http://localhost:5000/images/3.jpeg"
      },
      {
        productName: "purple pearl beaded chainmail necklace",
        price: 40.0,
        productImage: "http://localhost:5000/images/4.jpeg"
      },
      {
        productName: "brown beaded chainmail choker",
        price: 30.0,
        productImage: "http://localhost:5000/images/5.jpeg"
      },
      {
        productName: "flower pendant chain choker",
        price: 25.0,
        productImage: "http://localhost:5000/images/6.jpeg"
      },
      {
        productName: "crystal chainmail choker",
        price: 35.0,
        productImage: "http://localhost:5000/images/7.jpeg"
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
