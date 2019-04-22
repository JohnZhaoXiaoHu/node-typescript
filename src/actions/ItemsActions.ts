import { Request, Response } from 'express';
import { Client } from 'pg';
import Postgres from '../db/Postgres';

export default class ItemsActions {
    private pgClient: Client;

    constructor() {
        this.pgClient = new Postgres().client;
    }

    public getAllItems = (req: Request, res: Response ) => {
        const query = 'SELECT * FROM items';
        this.pgClient.query(query, (pgerr, pgres) => {
            if (pgerr) {
                return console.log(pgerr);
            }
            res.send(pgres.rows);
        });
    }
    public getItemById = (req: Request, res: Response ) => {
        const query = 'SELECT item_name FROM items WHERE item_id = $1';
        const id = req.params.id;
        this.pgClient.query(query, [id], (pgerr, pgres) => {
            res.send(pgres.rows);
        });
    }
}
