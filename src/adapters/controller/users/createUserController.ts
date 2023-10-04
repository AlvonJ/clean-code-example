import { createUserInteractor } from '../../../domain/interactor/createUserInteractor';
import { createUserPersistence } from '../../../infrastructure/database/mongodb/users/createUserPersistence';
import { sendRegistrationEmailPersistence } from '../../../infrastructure/database/mysql/users/sendRegistrationPersistence';

// Create User
export async function createUser(req, res, next): Promise<void> {
  const { username, password, email, phone } = req.body;

  try {
    const newUser = await createUserInteractor(
      {
        sendRegistrationEmailPersistence,
        createUserPersistence,
      },
      { username, password, email, phone }
    );

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}
