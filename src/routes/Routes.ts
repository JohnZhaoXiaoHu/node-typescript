import { Router } from 'express';
import Users from '../actions/Users';

export default class Routes {
    public router: Router;
    private users: Users;

    constructor() {
        this.router = Router();
        this.users = new Users();

        this.configRoutes();
    }

    private configRoutes(): void {
        // Users
        this.router.get('/users', this.users.getAllUsers);
        this.router.get('/users/:id', this.users.getUserById);
    }
}
