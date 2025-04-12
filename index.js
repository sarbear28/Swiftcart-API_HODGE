
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Apply global rate limit on calls 150 req. permin
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 150,
  message: { error: 'Too many requests. Please try again later.' }
});

app.use(globalLimiter);

// Route imports
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
