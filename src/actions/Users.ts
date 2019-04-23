import { Request, Response } from 'express';
import { Client } from 'pg';
import { pgClient } from '../db/Postgres';

export default {
  getAllUsers: (req: Request, res: Response) => {
    const query = 'SELECT * FROM users';
    pgClient.query(query, (pgerr, pgres) => {
      if (pgerr) {
        return console.log(pgerr);
      }
      res.send(pgres.rows);
    });
  },
  getUserById: (req: Request, res: Response) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const id = req.params.id;
    pgClient.query(query, [id], (pgerr, pgres) => {
      res.send(pgres.rows);
    });
  }
};
