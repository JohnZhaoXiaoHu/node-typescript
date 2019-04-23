import { Router } from 'express';
import users from '../actions/Users';

const router = Router();

// Users
router.get('/users', users.getAllUsers);
router.get('/users/:id', users.getUserById);

export default router;
