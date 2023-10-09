import { CallEntity } from '../../entity/CallEntity';

interface QueryParamsInterface {
  limit: number;
  page: number;
}

export async function getAllCallInteractor(
  {
    getAllCallPersistence,
  }: {
    getAllCallPersistence: (queryParams: QueryParamsInterface) => Promise<Array<any>>;
  },
  queryParams: QueryParamsInterface
): Promise<Array<CallEntity>> {
  const { limit, page } = queryParams;

  const calls = await getAllCallPersistence({ limit, page });

  return calls;
}
