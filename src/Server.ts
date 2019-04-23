import express from 'express';
import { Client } from 'pg';
import { PORT } from './config';
import { pgClient } from './db/Postgres';
import router from './routes';

const app = express();

app.get( '/', ( req, res ) => {
  res.send( 'Hello typescript!' );
});

app.use( '/', router);

pgClient.connect((err) => {
  if (err) {
      return console.error('failed connection to Postgres', err.stack);
  }
  console.log('successful connected to Postgres');

  app.listen( PORT, () => {
    console.log(`Server started at http://localhost:${ PORT }`);
  });
});
