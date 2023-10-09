import { Request, Response, NextFunction } from 'express';

import { deleteUserInteractor } from '../../../domain/interactor/users/deleteUserInteractor';
import { deleteUserPersistence } from '../../../infrastructure/database/mongodb/users/deleteUserPersistence';

// Delete User
export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    await deleteUserInteractor({ deleteUserPersistence }, { id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
