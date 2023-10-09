import { Request, Response, NextFunction } from 'express';
import { getContactInteractor } from '../../../domain/interactor/contacts/getContactInteractor';
import { getContactPersistence } from '../../../infrastructure/database/mongodb/contacts/getContactPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Read One contact
export async function getContact(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const contact = await getContactInteractor({ getContactPersistence }, { id });

    if (!contact) return next(new AppError('No contacts found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: contact,
    });
  } catch (err) {
    next(err);
  }
}
