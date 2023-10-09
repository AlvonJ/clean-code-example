import { Request, Response, NextFunction } from 'express';
import { createUserInteractor } from '../../../domain/interactor/users/createUserInteractor';
import { createUserPersistence } from '../../../infrastructure/database/mongodb/users/createUserPersistence';
import { sendRegistrationEmailPersistence } from '../../../infrastructure/database/mysql/users/sendRegistrationPersistence';
import { AppError } from '../../utils/AppError.js';

// Create User
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { username, password, email, phone, status, privacy, photo } = req.body;

  try {
    const newUser = await createUserInteractor(
      {
        sendRegistrationEmailPersistence,
        createUserPersistence,
      },
      { username, password, email, phone, status, privacy, photo }
    );

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    if (err.cause === 'ValidationError') return next(new AppError(err.message, 400));
    if (err.cause === 'DuplicateError') return next(new AppError(err.message, 400));

    next(err);
  }
}
