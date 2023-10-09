import { Request, Response, NextFunction } from 'express';
import { updateContactInteractor } from '../../../domain/interactor/contacts/updateContactInteractor';
import { updateContactPersistence } from '../../../infrastructure/database/mongodb/contacts/updateContactPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Update contact
export async function updateContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const { name, phone, user_id } = req.body;

  try {
    const updatedContact = await updateContactInteractor(
      {
        updateContactPersistence,
      },
      { id, name, phone, user_id, isUpdating: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedContact,
    });
  } catch (err) {
    if (err.cause === 'DataNotFound') return next(new AppError(err.message, 404));

    next(err);
  }
}
