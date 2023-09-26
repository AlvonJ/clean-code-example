import { UserEntity } from '../entity/UserEntity';

interface QueryParamsInterface {
  limit: number;
  page: number;
}

export async function getAllUserInteractor(
  {
    getAllUserPersistence,
  }: {
    getAllUserPersistence: (
      queryParams: QueryParamsInterface
    ) => Promise<Array<any>>;
  },
  queryParams: QueryParamsInterface
): Promise<Array<UserEntity>> {
  const { limit, page } = queryParams;

  const users = await getAllUserPersistence({ limit, page });

  return users;
}
