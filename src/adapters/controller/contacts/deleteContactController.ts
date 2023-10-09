import { Request, Response, NextFunction } from 'express';

import { deleteContactInteractor } from '../../../domain/interactor/contacts/deleteContactInteractor.js';
import { deleteContactPersistence } from '../../../infrastructure/database/mongodb/contacts/deleteContactPersistence.js';

// Delete Contact
export async function deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    await deleteContactInteractor({ deleteContactPersistence }, { id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
