import * as express from 'express';

import userController from '../controller/users/userController';

export const userRouter = express.Router();

// Create User
userRouter.post('/', userController.createUser);

// Update User
userRouter.patch('/:id', userController.updateUser);

// Get All Users
userRouter.get('/', userController.getAllUsers);

// Get One User
userRouter.get('/:id', userController.getUser);

// Delete User
userRouter.delete('/:id', userController.deleteUser);
