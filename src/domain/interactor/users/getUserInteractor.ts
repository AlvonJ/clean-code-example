import { UserEntity } from '../../entity/UserEntity';

interface HasId {
  id: string;
}

export async function getUserInteractor(
  {
    getUserPersistence,
  }: {
    getUserPersistence: ({ id }: HasId) => any;
  },
  { id }: HasId
): Promise<UserEntity> {
  const user = await getUserPersistence({ id });

  return user;
}
