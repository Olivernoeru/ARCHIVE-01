require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const db = require('./config/database');

// Initialize middleware
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', async (req, res) => {
  const isConnected = await db.testConnection();
  if (isConnected) {
    res.json({ status: 'ok', database: 'connected' });
  } else {
    res.json({ status: 'ok', database: 'disconnected' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Preloved API is running' });
});

// API Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api', require('./routes/productVariantRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Initialize database connection on server start
async function startServer() {
  await db.connect();
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;