import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import uuid from 'uuid/v1';
import User from '../db/models/User';

export default {
  giveAToken: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      login: ctx.request.body.login,
      pwd: ctx.request.body.password
    };
    try {
      const token = jwt.sign({ user }, 'privateKey');
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
  // tslint:disable-next-line:object-literal-sort-keys
  checkToken: (ctx: RouterContext, next: () => Promise<any>) => {
    let token = '';
    const bearerHeader = ctx.headers.authorization;
    if (bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      token = bearerToken;
    }
    try {
      const decoded = jwt.verify(token, 'privateKey') as any;
      ctx.body = decoded.user.login;
    } catch {
      ctx.body = 'decoding error';
    }
  },
};
