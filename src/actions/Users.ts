import { Request, Response } from 'express';
import { Client } from 'pg';
// import { pgClient } from '../db/Postgres';
import User from '../db/models/User';

export default {
  getAllUsers: (req: Request, res: Response) => {
    User.findAll({ limit: 10 }).then((users: [User]) => {
      // console.log(JSON.stringify(users, null, 10));
      res.send(users);
    });
  },
  getUserById: (req: Request, res: Response) => {
    const id = req.params.id;
    User.findAll({
      where: {
        id
      }
    }).then((users: [User]) => {
      res.send(users);
    });
  },
  getUserNameById: (req: Request, res: Response) => {
    const id = req.params.id;
    User.findAll({
      attributes: ['user_firstname'],
      where: {
        id
      }
    }).then((users: [User]) => {
      res.send(users);
    });
  }
};
