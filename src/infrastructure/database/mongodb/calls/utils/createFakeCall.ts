import { faker } from '@faker-js/faker';
import { client } from '../../index.js';
import { CallInterface } from '../../../../../domain/entity/CallEntity.js';
import { getAllCallPersistence } from '../getAllCallsPersistence.js';

export async function createFakeCall() {
  const call: Array<CallInterface> = [
    {
      caller: {
        id: faker.string.alphanumeric({ length: 24 }),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        username: faker.person.firstName(),
        photo: faker.image.url(),
      },
      receiver: {
        id: faker.string.alphanumeric({ length: 24 }),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        username: faker.person.firstName(),
        photo: faker.image.url(),
      },
      start: Number(faker.date.recent()),
      end: Number(faker.date.soon()),
      duration: Number(faker.date.soon()),
    },
    {
      caller: {
        id: faker.string.alphanumeric({ length: 24 }),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        username: faker.person.firstName(),
        photo: faker.image.url(),
      },
      receiver: {
        id: faker.string.alphanumeric({ length: 24 }),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        username: faker.person.firstName(),
        photo: faker.image.url(),
      },
      start: Number(faker.date.recent()),
      end: Number(faker.date.soon()),
      duration: Number(faker.date.soon()),
    },
  ];

  try {
    // Connect the client to the server
    await client.connect();
    const db = client.db('clean-architecture');

    const callsCollection = db.collection('calls');

    await callsCollection.insertMany(call);

    return getAllCallPersistence({ limit: 10, page: 1 });
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
}
