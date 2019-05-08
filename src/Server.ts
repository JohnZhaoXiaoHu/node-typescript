import http from 'http';
import koa from 'koa';

import logger from 'koa-morgan';
import serve from 'koa-static';
import { PORT } from './config';
import { sequelize } from './db';
import router from './routes';
import socketIoSetup from './routes/socketIO';

const app = new koa();
const server = new http.Server(app.callback());
socketIoSetup(server);

// logger setup
const logsType = process.env.NODE_ENV === 'production' ? 'short' : 'dev';
app.use(logger(logsType));

app.use(serve('src/views'));
app.use(router.routes());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Postgres has been established successfully.');

    server.listen( PORT, () => {
      console.log(`Server started at http://localhost:${ PORT }`);
    });
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default server;
