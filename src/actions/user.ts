import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import uuid from 'uuid';
import { BCRYPT_SALT, TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  createUser: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      mail: ctx.request.body.mail,
      pwd: ctx.request.body.password
    };
    try {
      const token = jwt.sign({ user }, TOKEN_KEY);
      const saltRounds = BCRYPT_SALT as number;
      const password = user.pwd;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        id: uuid(),
        mail: user.mail,
        password: hash,
      }).then((inserted) => {
        const newUser = inserted.toJSON();
        ctx.status = 201;
        ctx.body = {
          token,
          user: {...newUser}
        };
      }).catch((err) => {
        ctx.status = 400;
        ctx.body = `error adding user in db`;
        console.log(err);
      });
    } catch {
      ctx.status = 401;
      ctx.body = 'error getting token';
    }
  },

  getUserData: (ctx: RouterContext, next: () => Promise<any>) => {
    const token = ctx.token;
    try {
      const decoded = jwt.verify(token, TOKEN_KEY) as any;
      const mail = decoded.user.mail;
      return User.findOne({
        where: { mail }
      }).then((user: User) => {
        ctx.body = user;
      });
    } catch {
      ctx.status = 401;
      ctx.body = 'token error';
    }
  }
};
