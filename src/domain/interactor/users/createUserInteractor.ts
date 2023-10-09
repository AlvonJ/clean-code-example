import { UserEntity, UserInterface } from '../../entity/UserEntity';

interface EmailInfo {
  email: string;
  subject: string;
  text: string;
}

export async function createUserInteractor(
  {
    sendRegistrationEmailPersistence,
    createUserPersistence,
  }: {
    sendRegistrationEmailPersistence: (info: EmailInfo) => Promise<void>;
    createUserPersistence: (user: UserInterface) => Promise<any>;
  },
  user: UserInterface
): Promise<UserInterface> {
  const userObject = new UserEntity(user);

  userObject.validate();

  const userWithCreatedAt = { ...user, privacy: userObject.privacy, created_at: Date.now() };

  const newUser = await createUserPersistence(userWithCreatedAt);

  await sendRegistrationEmailPersistence({
    email: user.username,
    subject: 'Welcome',
    text: 'Welcome to the application',
  });

  return newUser;
}
