import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import uuid from 'uuid';
import { BCRYPT_SALT, TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  createUser: async (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      mail: ctx.request.body.mail,
      password: ctx.request.body.password
    };
    let bodyErr = null;
    Object.values(user).map((value, i) => {
      switch (value) {
        case undefined:
          const uKey = Object.keys(user)[i];
          ctx.status = 400;
          bodyErr = `${uKey} is not specified in the body`;
          break;
        case '':
          const nKey = Object.keys(user)[i];
          ctx.status = 400;
          bodyErr = `${nKey} cannot be empty`;
          console.log(value);
          break;
        default:
          break;
      }
    });
    if (bodyErr) {
      return ctx.body = bodyErr;
    }

    const token = jwt.sign({ user }, TOKEN_KEY);
    const saltRounds = BCRYPT_SALT as number;
    const password = user.password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let createdUser: User;
    try {
      createdUser = await User.create({
        id: uuid(),
        mail: user.mail,
        password: hash
      });
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
      return;
    }

    const newUser = createdUser.toJSON();

    ctx.status = 201;
    ctx.body = {
      token,
      user: {...newUser}
    };
  },

  getUserData: async (ctx: RouterContext, next: () => Promise<any>) => {
    const token = ctx.token;
    const decoded = jwt.verify(token, TOKEN_KEY) as any;
    const mail = decoded.user.mail;

    let dbUser: User;
    try {
      dbUser = await User.findOne({
        where: { mail }
      });
    } catch (err) {
      ctx.status = 404;
      ctx.body = err.message;
      return;
    }

    ctx.body = dbUser;
  }
};
