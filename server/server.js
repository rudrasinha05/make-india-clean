import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import driveRoutes from './routes/driveRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/media', mediaRoutes);

app.get('/', (req, res) => {
  res.send('Make India Clean API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));
