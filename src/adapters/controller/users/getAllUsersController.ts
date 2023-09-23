import { getAllUserInteractor } from '../../../domain/interactor/getAllUserInteractor';
import { getAllUserPersistence } from '../../../infrastructure/database/mongodb/getAllUserPersistence';

// Read All Users
export async function getAllUsers(req, res, next): Promise<void> {
  try {
    const users = await getAllUserInteractor({ getAllUserPersistence });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}
