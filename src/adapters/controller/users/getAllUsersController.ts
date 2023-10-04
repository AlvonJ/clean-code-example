import { getAllUserInteractor } from '../../../domain/interactor/getAllUserInteractor';
import { getAllUserPersistence } from '../../../infrastructure/database/mongodb/users/getAllUserPersistence';

// Read All Users
export async function getAllUsers(req, res, next): Promise<void> {
  try {
    const { limit = 10, page = 1 } = req.query;

    const users = await getAllUserInteractor(
      { getAllUserPersistence },
      { limit, page }
    );

    res.status(200).json({
      status: 'success',
      results: users.length,
      page: +page,
      data: users,
    });
  } catch (err) {
    next(err);
  }
}
