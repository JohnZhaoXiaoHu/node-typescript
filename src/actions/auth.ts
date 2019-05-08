import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import User from '../db/models/User';

export default {
  giveAToken: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      login: ctx.request.body.login,
      pwd: ctx.request.body.password
    };
    try {
      const token = jwt.sign({ user }, 'privateKey');
      const password = user.pwd;

      return User.findOne({
        where: {
          mail: user.login,
        }
      }).then((usr: User) => {
        const hashedPwd = usr.get('password') as string;
        return bcrypt.compare(password, hashedPwd).then((res) => {
          console.log(res);
          ctx.body = token;
        });
      }).catch((err) => {
        ctx.body = `error getting user`;
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
