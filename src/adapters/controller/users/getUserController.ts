import { Request, Response, NextFunction } from 'express';
import { getUserInteractor } from '../../../domain/interactor/users/getUserInteractor';
import { getUserPersistence } from '../../../infrastructure/database/mongodb/users/getUserPersistence';
import { AppError } from '../../utils/AppError.js';

// Read One User
export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const user = await getUserInteractor({ getUserPersistence }, { id });

    if (!user) return next(new AppError('No users found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
