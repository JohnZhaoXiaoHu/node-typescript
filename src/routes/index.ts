import bodyParser from 'koa-body';
import Router from 'koa-router';
import auth from '../actions/auth';
import redis from '../actions/redis';
import user from '../actions/user';

const router = new Router({ strict: true });

const checkToken = async (ctx: Router.RouterContext, next: () => Promise<any>) => {
  const header = ctx.headers.authorization;
  if (header !== undefined) {
      const bearer = header.split(' ');
      const token = bearer[1];

      ctx.token = token;
      await next();
  } else {
      ctx.sendStatus(403);
  }
};

// Routes

router.get( '/', ( ctx, next ) => {
  ctx.body = 'Hello typescript!';
});

// Auth
router.post('/token', bodyParser(), auth.giveAToken);

// User
router.get('/user', bodyParser(), checkToken, user.getUserData);
router.post('/user', bodyParser(), user.createUser);

// Redis
router.get('/redis', redis.get);
router.post('/redis', bodyParser(), redis.set);

export default router;
