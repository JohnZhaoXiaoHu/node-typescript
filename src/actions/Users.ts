import { RouterContext } from 'koa-router';
import User from '../db/models/User';

export default {
  getUsers: (ctx: RouterContext, next: () => Promise<any>) => {
    const limit = ctx.query.limit;
    return User.findAll({ limit: limit || 10 }).then((users: [User]) => {
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
  }
};
