import { Router } from 'express';
import users from '../actions/users';

const router = Router({strict: true});

// Users
router.get('/users', users.getAllUsers);
router.get('/users/:id', users.getUserById);
router.get('/users/:id/name', users.getUserNameById);

export default router;
