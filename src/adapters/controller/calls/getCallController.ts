import { Request, Response, NextFunction } from 'express';
import { getCallInteractor } from '../../../domain/interactor/calls/getCallInteractor';
import { getCallPersistence } from '../../../infrastructure/database/mongodb/calls/getCallPersistence.js';
import { AppError } from '../../utils/AppError.js';

// Read One call
export async function getCall(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;

  try {
    const call = await getCallInteractor({ getCallPersistence }, { id });

    if (!call) return next(new AppError('No calls found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: call,
    });
  } catch (err) {
    next(err);
  }
}
