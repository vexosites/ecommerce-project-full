import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { app } from './app.js';

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use(cookieParser())

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});