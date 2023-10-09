import { Request, Response, NextFunction } from 'express';
import { createCallInteractor } from '../../../domain/interactor/calls/createCallInteractor';
import { createCallPersistence } from '../../../infrastructure/database/mongodb/calls/createCallPersistence';
import { AppError } from '../../utils/AppError.js';

// Create Call
export async function createCall(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { caller, receiver, start, end, duration } = req.body;

  try {
    const newCall = await createCallInteractor(
      {
        createCallPersistence,
      },
      { caller, receiver, start, end, duration }
    );

    res.status(201).json({
      status: 'success',
      data: newCall,
    });
  } catch (err) {
    if (err.cause === 'ValidationError') return next(new AppError(err.message, 400));

    next(err);
  }
}
