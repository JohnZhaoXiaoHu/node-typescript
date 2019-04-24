import express from 'express';
import { Client } from 'pg';
import { PORT } from './config';
// import { pgClient } from './db/Postgres';
import { sequelize } from './db';
import router from './routes';

const app = express();

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
