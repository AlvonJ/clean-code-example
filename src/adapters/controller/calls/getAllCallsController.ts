import { Response, NextFunction } from 'express';

import { getAllCallInteractor } from '../../../domain/interactor/calls/getAllCallInteractor';
import { getAllCallPersistence } from '../../../infrastructure/database/mongodb/calls/getAllCallsPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Read All calls
export async function getAllCalls(req, res: Response, next: NextFunction): Promise<void> {
  try {
    const { limit = 10, page = 1 } = req.query;

    const calls = await getAllCallInteractor({ getAllCallPersistence }, { limit, page });

    if (calls.length === 0) return next(new AppError('No calls found', 404));

    res.status(200).json({
      status: 'success',
      results: calls.length,
      page: +page,
      data: calls,
    });
  } catch (err) {
    next(err);
  }
}
