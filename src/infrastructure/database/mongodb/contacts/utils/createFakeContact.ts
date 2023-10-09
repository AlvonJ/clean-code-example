import { faker } from '@faker-js/faker';
import { client } from '../../index.js';
import { ContactInterface } from '../../../../../domain/entity/ContactEntity.js';
import { getAllContactPersistence } from '../getAllContactPersistence.js';

export async function createFakeContact() {
  const contact: Array<ContactInterface> = [
    {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      user_id: faker.string.alphanumeric({ length: 24 }),
    },
    {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      user_id: faker.string.alphanumeric({ length: 24 }),
    },
  ];

  try {
    // Connect the client to the server
    await client.connect();
    const db = client.db('clean-architecture');

    const contactsCollection = db.collection('contacts');

    await contactsCollection.insertMany(contact);

    return getAllContactPersistence({ limit: 10, page: 1 });
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
}
