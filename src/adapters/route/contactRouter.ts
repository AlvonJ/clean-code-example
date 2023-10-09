import express from 'express';

import contactController from '../controller/contacts';

export const contactRouter = express.Router();

// Create contact
contactRouter.post('/', contactController.createContact);

// Update contact
contactRouter.patch('/:id', contactController.updateContact);

// Get All contacts
contactRouter.get('/', contactController.getAllContacts);

// Get One contact
contactRouter.get('/:id', contactController.getContact);

// Delete contact
contactRouter.delete('/:id', contactController.deleteContact);
