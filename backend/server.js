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

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

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

app.post('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to favorites' });
  }
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

app.delete('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== productId);
    await user.save();
    
    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from favorites' });
  }
});

app.get('/api/favorites/:userId', authenticateToken, async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.params.userId).populate('favorites');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      favorites: []
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
