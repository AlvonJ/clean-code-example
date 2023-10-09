import { Response, NextFunction } from 'express';

import { getAllContactInteractor } from '../../../domain/interactor/contacts/getAllContactInteractor';
import { getAllContactPersistence } from '../../../infrastructure/database/mongodb/contacts/getAllContactPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Read All contacts
export async function getAllContacts(req, res: Response, next: NextFunction): Promise<void> {
  try {
    const { limit = 10, page = 1 } = req.query;

    const contacts = await getAllContactInteractor({ getAllContactPersistence }, { limit, page });

    if (contacts.length === 0) return next(new AppError('No contacts found', 404));

    res.status(200).json({
      status: 'success',
      results: contacts.length,
      page: +page,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
}
