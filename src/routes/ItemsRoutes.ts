import { Router } from 'express';
import { ItemsActions } from '../actions/ItemsActions';

export class ItemsRoutes {
    public router: Router;
    private users: ItemsActions;

    constructor() {
        this.router = Router();
        this.users = new ItemsActions();

        this.configRoutes();
    }

    private configRoutes(): void {
        this.router.get('/', this.users.getAllItems);
        this.router.get('/:id', this.users.getItemById);
    }
}
