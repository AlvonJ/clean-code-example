import { deleteUserInteractor } from '../../../domain/interactor/deleteUserInteractor';
import { deleteUserPersistence } from '../../../infrastructure/database/mysql/deleteUserPersistence';

// Delete User
export async function deleteUser(req, res, next): Promise<void> {
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
