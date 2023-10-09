import { ContactEntity, ContactInterface } from '../../entity/ContactEntity';

export async function updateContactInteractor(
  {
    updateContactPersistence,
  }: {
    updateContactPersistence: (contact: ContactInterface) => Promise<any>;
  },
  contact: ContactInterface
): Promise<ContactEntity> {
  // Create a new ContactEntity instance
  const updatedContactObject = new ContactEntity(contact);

  // Check if contact name and phone is valid
  updatedContactObject.validate();

  // Update the Contact using the provided persistence function
  const updatedContact = await updateContactPersistence(contact);

  return updatedContact;
}
