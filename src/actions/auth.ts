import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import { TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  giveAToken: async (ctx: RouterContext, next: () => Promise<any>) => {
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
    const password = user.password;

    let dbUser: User;
    try {
      dbUser = await User.findOne({
        where: {
          mail: user.mail,
        }
      });
    } catch (err) {
      ctx.status = 404;
      ctx.body = `user not found`;
      return;
    }

    const hashedPwd = dbUser.get('password') as string;

    let match: boolean;
    try {
      match = await bcrypt.compare(password, hashedPwd);
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
      return;
    }
    if (!match) {
      ctx.status = 403;
      ctx.body = 'wrong password';
      return;
    }

    ctx.body = token;
  }
};
