import { Request, Response, NextFunction } from 'express';
import { createContactInteractor } from '../../../domain/interactor/contacts/createContactInteractor';
import { createContactPersistence } from '../../../infrastructure/database/mongodb/contacts/createContactPersistence';
import { AppError } from '../../utils/AppError.js';

// Create contact
export async function createContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name, phone, user_id } = req.body;

  try {
    const newContact = await createContactInteractor(
      {
        createContactPersistence,
      },
      { name, phone, user_id }
    );

    res.status(201).json({
      status: 'success',
      data: newContact,
    });
  } catch (err) {
    if (err.cause === 'ValidationError') return next(new AppError(err.message, 400));
    if (err.cause === 'DuplicateError') return next(new AppError(err.message, 400));
    if (err.cause === 'DataNotFound') return next(new AppError(err.message, 404));

    next(err);
  }
}
