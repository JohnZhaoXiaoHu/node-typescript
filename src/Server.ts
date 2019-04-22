import express from 'express';
import { Client } from 'pg';
import { PORT } from './config';
import Postgres from './db/Postgres';
import Routes from './routes/Routes';

class Server {
  public app: express.Application;
  private router: express.Router;
  private pgClient: Client;

  constructor() {
    this.app = express();
    this.router = Routes.router;
    this.pgClient = Postgres.client;

    this.configRoutes();

    this.pgClient.connect((err) => {
      if (err) {
          return console.error('failed connection to Postgres', err.stack);
      }
      console.log('successful connected to Postgres');

      this.app.listen( PORT, () => {
        console.log(`Server started at http://localhost:${ PORT }`);
      });
    });
  }

  private configRoutes(): void {
    this.app.get( '/', ( req, res ) => {
      res.send( 'Hello typescript!' );
    });

    this.app.use( '/', this.router);
  }
}
export default new Server();
