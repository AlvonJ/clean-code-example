import { updateUserInteractor } from '../../../domain/interactor/updateUserInteractor';
import { updateUserPersistence } from '../../../infrastructure/database/mongodb/updateUserPersistence.js';

// Update User
export async function updateUser(req, res, next): Promise<void> {
  const { id } = req.params;
  const { username, password, phone, email } = req.body;

  try {
    const updatedUser = await updateUserInteractor(
      {
        updateUserPersistence,
      },
      { id, username, password, phone, email, isUpdating: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}
