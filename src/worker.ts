import express from 'express';
import { ItemsRoutes } from './routes/ItemsRoutes';

export class Worker {
  public app: express.Application;
  private itemsRouter: express.Router;

  constructor() {
    this.app = express();
    this.itemsRouter = new ItemsRoutes().router ;

    this.configRoutes();
  }

  private configRoutes(): void {
    this.app.get( '/', ( req, res ) => {
      res.send( 'Hello typescript!' );
    });

    // items
    this.app.use( '/items', this.itemsRouter);
  }
}
