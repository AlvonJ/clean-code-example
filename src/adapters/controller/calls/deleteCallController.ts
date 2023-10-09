import { Request, Response, NextFunction } from 'express';

import { deleteCallInteractor } from '../../../domain/interactor/calls/deleteCallInteractor.js';
import { deleteCallPersistence } from '../../../infrastructure/database/mongodb/calls/deleteCallPersistence.js';

// Delete Call
export async function deleteCall(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    await deleteCallInteractor({ deleteCallPersistence }, { id });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
}
