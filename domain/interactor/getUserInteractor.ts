import { UserEntity } from '../entity/UserEntity';

export async function getUserInteractor(
  {
    getUserPersistence,
  }: {
    getUserPersistence: ({ id }: { id: string }) => Promise<UserEntity>;
  },
  { id }: { id: string }
): Promise<UserEntity> {
  const user = await getUserPersistence({ id });

  return user;
}
