// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RouterContext } from 'koa-router';

export default {
  giveAToken: (ctx: RouterContext, next: () => Promise<any>) => {
    const user = {
      login: ctx.request.body.login,
      pwd: ctx.request.body.password
    };
    let token;
    try {
      token = jwt.sign({ user }, 'privateKey');
    } catch {
      console.log('error getting token');
    }
    console.log(token);
    ctx.body = token;
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
    let decoded;
    try {
      decoded = jwt.verify(token, 'privateKey');
    } catch {
      console.log('decoding error');
    }
    console.log(decoded);
    ctx.body = decoded;
  },
};
