import { ContactEntity } from '../../entity/ContactEntity';

interface QueryParamsInterface {
  limit: number;
  page: number;
}

export async function getAllContactInteractor(
  {
    getAllContactPersistence,
  }: {
    getAllContactPersistence: (queryParams: QueryParamsInterface) => Promise<Array<any>>;
  },
  queryParams: QueryParamsInterface
): Promise<Array<ContactEntity>> {
  const { limit, page } = queryParams;

  const contacts = await getAllContactPersistence({ limit, page });

  return contacts;
}
