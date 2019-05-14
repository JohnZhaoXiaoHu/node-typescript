import dotenv from 'dotenv';
dotenv.config();

export const DB_URL = process.env.DB_URL;
export const PORT = process.env.PORT || 3000;

export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'privateKey';
export const BCRYPT_SALT = process.env.BCRYPR_SALT || 9;
