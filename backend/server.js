import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/images', imageRoutes);

// Handle preflight requests
app.options('*', cors(corsOptions));

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
