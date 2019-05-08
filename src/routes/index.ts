import bodyParser from 'koa-body';
import Router from 'koa-router';
import auth from '../actions/auth';
import redis from '../actions/redis';
import users from '../actions/users';

const router = new Router({ strict: true });

router.get( '/', ( ctx, next ) => {
  ctx.body = 'Hello typescript!';
});

// Auth
router.post('/token', bodyParser(), auth.giveAToken);
router.get('/checkToken', auth.checkToken);

// Users
router.get('/users', users.getUsers);
router.post('/users', bodyParser(), users.createUser);
router.get('/users/:id', users.getUserById);
router.get('/users/:id/name', users.getUserNameById);

// Redis
router.get('/redis', redis.get);
router.post('/redis', bodyParser(), redis.set);

export default router;
