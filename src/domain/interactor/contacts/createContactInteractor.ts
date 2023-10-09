import { ContactEntity, ContactInterface } from '../../entity/ContactEntity.js';

export async function createContactInteractor(
  {
    createContactPersistence,
  }: {
    createContactPersistence: (contact: ContactInterface) => Promise<any>;
  },
  contact: ContactInterface
): Promise<ContactInterface> {
  const contactObject = new ContactEntity(contact);

  contactObject.validate();

  const contactWithCreatedAt = { ...contact, created_at: Date.now() };

  const newContact = await createContactPersistence(contactWithCreatedAt);

  return newContact;
}
