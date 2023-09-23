import { UserEntity } from '../entity/UserEntity';

export async function getAllUserInteractor({
  getAllUserPersistence,
}: {
  getAllUserPersistence: () => Promise<Array<any>>;
}): Promise<Array<UserEntity>> {
  const users = await getAllUserPersistence();

  return users;
}
