import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import uuid from 'uuid';
import { TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  getUsers: (ctx: RouterContext, next: () => Promise<any>) => {
    const limit = ctx.query.limit;
    const offset = ctx.query.offset;
    return User.findAll({
      limit: limit || 10, offset: offset || 0
    }).then((users: [User]) => {
      // console.log(JSON.stringify(users, null, 10));
      ctx.body = users;
    });
  },
  // tslint:disable-next-line:object-literal-sort-keys
  getUserById: (ctx: RouterContext, next: () => Promise<any>) => {
    const id = ctx.params.id;
    return User.findOne({
      where: { id }
    }).then((user: User) => {
      ctx.body = user;
    });
  },
  getUserNameById: (ctx: RouterContext, next: () => Promise<any>) => {
    const id = ctx.params.id;
    return User.findOne({
      attributes: ['user_firstname'],
      where: { id }
    }).then((user: User) => {
      ctx.body = user;
    });
  },
  createUser: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      login: ctx.request.body.login,
      pwd: ctx.request.body.password
    };
    try {
      const token = jwt.sign({ user }, TOKEN_KEY);
      const saltRounds = 10;
      const password = user.pwd;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      return User.create({
        id: uuid(),
        mail: user.login,
        password: hash,
      }).then((inserted) => {
        console.log(hash);
        console.log(inserted);
        ctx.body = token;
      }).catch((err) => {
        ctx.body = `error adding user in db: ${err}`;
      });
    } catch {
      ctx.body = 'error getting token';
    }
  },
};
