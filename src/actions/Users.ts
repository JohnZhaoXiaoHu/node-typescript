import { Request, Response } from 'express';
import { Client } from 'pg';
import Postgres from '../db/Postgres';

export default class Users {
  private pgClient: Client;

  constructor() {
    this.pgClient = Postgres.client;
  }

  public getAllUsers = (req: Request, res: Response) => {
    const query = 'SELECT * FROM users';
    this.pgClient.query(query, (pgerr, pgres) => {
      if (pgerr) {
        return console.log(pgerr);
      }
      res.send(pgres.rows);
    });
  }
  public getUserById = (req: Request, res: Response) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const id = req.params.id;
    this.pgClient.query(query, [id], (pgerr, pgres) => {
      res.send(pgres.rows);
    });
  }
}
