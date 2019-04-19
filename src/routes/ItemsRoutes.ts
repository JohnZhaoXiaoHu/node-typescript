import { Router } from 'express';
import { ItemsActions } from '../actions/ItemsActions';

export class ItemsRoutes {
    public router: Router;
    private items: ItemsActions;

    constructor() {
        this.router = Router();
        this.items = new ItemsActions();

        this.configRoutes();
    }

    private configRoutes(): void {
        this.router.get('/', this.items.getAllItems);
        this.router.get('/:id', this.items.getItemById);
    }
}
