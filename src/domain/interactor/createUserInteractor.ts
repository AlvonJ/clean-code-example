import { UserEntity, UserInterface } from '../entity/UserEntity';

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
    createUserPersistence: (user: UserInterface) => Promise<UserInterface>;
  },
  user: UserInterface
): Promise<UserInterface> {
  const userObject = new UserEntity(user);

  userObject.validate();

  const newUser = await createUserPersistence(user);

  await sendRegistrationEmailPersistence({
    email: user.username,
    subject: 'Welcome',
    text: 'Welcome to the application',
  });

  return newUser;
}
