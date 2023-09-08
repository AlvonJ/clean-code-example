import { UserEntity } from '../entity/UserEntity';

export const getAllUserInteractor = async ({
  getAllUserPersistence,
}: {
  getAllUserPersistence: () => Promise<Array<UserEntity>>;
}): Promise<Array<UserEntity>> => {
  const users = await getAllUserPersistence();

  return users;
};
