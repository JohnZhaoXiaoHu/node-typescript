import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = process.env.PORT || 3000;

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
