import express, { json } from 'express';
import connectDB from './config/db.js';
import { config } from 'dotenv';
import cors from 'cors';
import corsOptions from './utils/cors.js';
import indexRoute from './routes/index.route.js';
import cookieParser from "cookie-parser";

const app = express();

config();
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());
app.use(cors(corsOptions));

// Route
app.use('/api/v1', indexRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));