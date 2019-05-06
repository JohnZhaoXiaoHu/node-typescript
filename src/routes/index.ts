import bodyParser from 'koa-body';
import Router from 'koa-router';
import redis from '../actions/redis';
import users from '../actions/users';

const router = new Router({ strict: true });

router.get( '/', ( ctx, next ) => {
  ctx.body = 'Hello typescript!';
});

// Users
router.get('/users', users.getUsers);
router.get('/users/:id', users.getUserById);
router.get('/users/:id/name', users.getUserNameById);

// Redis
router.get('/redis', redis.get);
router.post('/redis', bodyParser(), redis.set);

export default router;
