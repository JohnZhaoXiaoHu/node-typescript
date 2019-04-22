import express from 'express';
import { Client } from 'pg';
import { PORT } from './config';
import Postgres from './db/Postgres';
import ItemsRoutes from './routes/ItemsRoutes';

class Server {
  public app: express.Application;
  private itemsRouter: express.Router;
  private pgClient: Client;

  constructor() {
    this.app = express();
    this.itemsRouter = new ItemsRoutes().router;
    this.pgClient = new Postgres().client;

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

    // items
    this.app.use( '/items', this.itemsRouter);
  }
}
export default new Server();
