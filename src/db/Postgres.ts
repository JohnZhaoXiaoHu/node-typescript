import { Client } from 'pg';
import { DB_URL } from '../config';

export default class Postgres {
    public client: Client;

    constructor() {
        const connectionString = DB_URL;
        this.client = new Client({
            connectionString
        });
    }
}
