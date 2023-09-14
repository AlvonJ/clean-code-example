import { updateUserInteractor } from '../../../domain/interactor/updateUserInteractor';
import { updateUserPersistence } from '../../../infrastructure/database/mysql/updateUserPersistence';

// Update User
export async function updateUser(req, res, next): Promise<void> {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const updatedUser = await updateUserInteractor(
      {
        updateUserPersistence,
      },
      { id, username, password }
    );

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}
