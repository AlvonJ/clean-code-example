import { UserEntity, UserInterface } from '../entity/UserEntity';

export async function updateUserInteractor(
  {
    updateUserPersistence,
  }: {
    updateUserPersistence: (user: UserInterface) => Promise<any>;
  },
  user: UserInterface
): Promise<UserEntity> {
  const updatedUserObject = new UserEntity(user);

  // Check if username and password valid
  updatedUserObject.validate();

  const updatedUser = await updateUserPersistence(user);

  return updatedUser;
}
