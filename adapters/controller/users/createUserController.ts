import { createUserInteractor } from '../../../domain/interactor/createUserInteractor';
import { createUserPersistence } from '../../../infrastructure/database/mysql/createUserPersistence';
import { sendRegistrationEmailPersistence } from '../../../infrastructure/database/mysql/sendRegistrationPersistence';

// Create User
export async function createUser(req, res, next): Promise<void> {
  const { username, password } = req.body;

  try {
    const newUser = await createUserInteractor(
      {
        sendRegistrationEmailPersistence,
        createUserPersistence,
      },
      { username, password }
    );

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}
