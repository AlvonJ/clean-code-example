import express from 'express';

import callController from '../controller/calls';

export const callRouter = express.Router();

// Create call
callRouter.post('/', callController.createCall);

// Get All calls
callRouter.get('/', callController.getAllCalls);

// Get One call
callRouter.get('/:id', callController.getCall);

// Delete call
callRouter.delete('/:id', callController.deleteCall);
