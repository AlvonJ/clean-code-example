import { UserEntity } from '../entity/UserEntity';

export async function updateUserInteractor(
  {
    updateUserPersistence,
  }: {
    updateUserPersistence: ({
      id,
      username,
      password,
    }: {
      id: string;
      username: string;
      password: string;
    }) => Promise<UserEntity>;
  },
  { id, username, password }: { id: string; username: string; password: string }
): Promise<UserEntity> {
  const user = await new UserEntity({ username, password });

  // Check if username and password valid
  user.validate();

  const updatedUser = await updateUserPersistence({ id, username, password });

  return updatedUser;
}
