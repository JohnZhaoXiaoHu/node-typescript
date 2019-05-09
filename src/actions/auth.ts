import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';
import { TOKEN_KEY } from '../config';
import User from '../db/models/User';

export default {
  giveAToken: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      mail: ctx.request.body.mail,
      pwd: ctx.request.body.password
    };
    try {
      const token = jwt.sign({ user }, TOKEN_KEY);
      const password = user.pwd;

      return User.findOne({
        where: {
          mail: user.mail,
        }
      }).then((usr: User) => {
        const hashedPwd = usr.get('password') as string;
        return bcrypt.compare(password, hashedPwd).then((res) => {
          if (res) {
            ctx.body = token;
          } else {
            ctx.status = 401;
            ctx.body = 'wrong password';
          }
        });
      }).catch((err) => {
        ctx.status = 500;
        ctx.body = `error getting user`;
        console.log(err);
      });
    } catch {
      ctx.status = 401;
      ctx.body = 'error getting token';
    }
  }
};
