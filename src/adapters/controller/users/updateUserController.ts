import { Request, Response, NextFunction } from 'express';
import { updateUserInteractor } from '../../../domain/interactor/users/updateUserInteractor';
import { updateUserPersistence } from '../../../infrastructure/database/mongodb/users/updateUserPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Update User
export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const { username, password, phone, email, status, privacy, photo } = req.body;

  try {
    const updatedUser = await updateUserInteractor(
      {
        updateUserPersistence,
      },
      { id, username, password, phone, email, status, privacy, photo, isUpdating: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    if (err.cause === 'DataNotFound') return next(new AppError(err.message, 404));

    next(err);
  }
}
