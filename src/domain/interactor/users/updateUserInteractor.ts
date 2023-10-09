import { UserEntity, UserInterface } from '../../entity/UserEntity';

export async function updateUserInteractor(
  {
    updateUserPersistence,
  }: {
    updateUserPersistence: (user: UserInterface) => Promise<any>;
  },
  user: UserInterface
): Promise<UserEntity> {
  // Create a new UserEntity instance
  const updatedUserObject = new UserEntity(user);

  // Check if username and password valid
  updatedUserObject.validate();

  if (user.privacy) user.privacy = updatedUserObject.privacy;

  // Update the user using the provided persistence function
  const updatedUser = await updateUserPersistence(user);

  return updatedUser;
}
