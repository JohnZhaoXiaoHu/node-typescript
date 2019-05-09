import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import { TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  giveAToken: async (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      mail: ctx.request.body.mail,
      pwd: ctx.request.body.password
    };
    const token = jwt.sign({ user }, TOKEN_KEY);
    const password = user.pwd;

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
      ctx.status = 500;
      console.log(err);
      return;
    }
    if (!match) {
      ctx.status = 401;
      ctx.body = 'wrong password';
      return;
    }

    ctx.body = token;
  }
};
