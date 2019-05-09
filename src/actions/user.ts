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
      pwd: ctx.request.body.password
    };
    const token = jwt.sign({ user }, TOKEN_KEY);
    const saltRounds = BCRYPT_SALT as number;
    const password = user.pwd;
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
      ctx.body = `error adding user in db`;
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
      ctx.body = `user not found`;
      return;
    }
    ctx.body = dbUser;
  }
};
