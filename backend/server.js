
// server.js
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

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://getmaxcrm.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/images', imageRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
