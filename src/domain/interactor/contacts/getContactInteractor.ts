import { ContactEntity } from '../../entity/ContactEntity';

interface HasId {
  id: string;
}

export async function getContactInteractor(
  {
    getContactPersistence,
  }: {
    getContactPersistence: ({ id }: HasId) => any;
  },
  { id }: HasId
): Promise<ContactEntity> {
  const contact = await getContactPersistence({ id });

  return contact;
}
