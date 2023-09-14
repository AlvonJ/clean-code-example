import { UserEntity } from '../entity/UserEntity';

export async function createUserInteractor(
  {
    sendRegistrationEmailPersistence,
    createUserPersistence,
  }: {
    sendRegistrationEmailPersistence: ({
      email,
      subject,
      text,
    }: {
      email: string;
      subject: string;
      text: string;
    }) => Promise<void>;
    createUserPersistence: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => Promise<UserEntity>;
  },
  { username, password }: { username: string; password: string }
): Promise<UserEntity> {
  const user = await new UserEntity({ username, password });

  user.validate();

  const newUser = await createUserPersistence({ username, password });

  await sendRegistrationEmailPersistence({
    email: username,
    subject: 'Welcome',
    text: 'Welcome to the application',
  });

  return newUser;
}
