import { RouterContext } from 'koa-router';
import redis from 'redis';
import { promisify } from 'util';
import { REDIS_URL } from '../config/index';

const client = redis.createClient(REDIS_URL);
// setup Redis for async/await
const getAsync = promisify(client.get).bind(client);

client.on('connect', () => {
  console.log('Successful connection to Redis');
});
client.on('error', (err) => {
    console.log('Error ' + err);
});

export default {
  get: async (ctx: RouterContext, next: () => Promise<any>) => {
    const key = ctx.query.key;
    const res = await getAsync(key);
    ctx.body = `set redis, key: ${key}, value: ${res}`;
  },
  set: async (ctx: RouterContext, next: () => Promise<any>) => {
    const key = ctx.request.body.key;
    const val = ctx.request.body.value;
    await client.set(key, val);
    ctx.body = `set redis, key: ${key}, value: ${val}`;
  },
};
