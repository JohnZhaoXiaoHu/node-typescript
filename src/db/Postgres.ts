import { Client } from 'pg';
import { DB_URL } from '../config';

const connectionString = DB_URL;

export const pgClient = new Client({
    connectionString
});
