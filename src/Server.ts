import express from 'express';
import morgan from 'morgan';
import { Client } from 'pg';
import { PORT } from './config';
import { sequelize } from './db';
import router from './routes';

const app = express();

// morgan setup
const logsType = process.env.NODE_ENV === 'production' ? 'short' : 'dev';
app.use(morgan(logsType, {}));

app.disable('etag');

app.get( '/', ( req, res ) => {
  res.send( 'Hello typescript!' );
});

app.use( '/', router);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Postgres has been established successfully.');

    app.listen( PORT, () => {
      console.log(`Server started at http://localhost:${ PORT }`);
    });
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

export default app;
