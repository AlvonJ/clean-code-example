import { UserEntity } from '../entity/UserEntity';

export async function getAllUserInteractor({
  getAllUserPersistence,
}: {
  getAllUserPersistence: () => Promise<Array<UserEntity>>;
}): Promise<Array<UserEntity>> {
  const users = await getAllUserPersistence();

  return users;
}
