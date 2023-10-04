import { getUserInteractor } from '../../../domain/interactor/getUserInteractor';
import { getUserPersistence } from '../../../infrastructure/database/mongodb/users/getUserPersistence';

// Read One User
export async function getUser(req, res, next): Promise<void> {
  const { id } = req.params;

  try {
    const user = await getUserInteractor({ getUserPersistence }, { id });

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
}
