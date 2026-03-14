import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

import connectDB from './config/db';
import './config/firebase'; // Initialize Firebase

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Webhook requires raw body for signature verification
import { handleWebhook } from './controllers/PolarController';
app.post('/api/polar/webhook', express.raw({ type: 'application/json' }), handleWebhook);

app.use(express.json());

// Routes
app.use('/api', routes);

// Database Connection
connectDB();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 

export default app;
