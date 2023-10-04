import { UserInterface } from '../../../../../domain/entity/UserEntity.js';
import { faker } from '@faker-js/faker';
import { client } from '../../index.js';
import { getAllUserPersistence } from '../getAllUserPersistence.js';

export async function createFakeUser() {
  const user: Array<UserInterface> = [
    {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
    },
    {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
    },
    {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
    },
  ];

  try {
    // Connect the client to the server
    await client.connect();
    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    await usersCollection.insertMany(user);

    return getAllUserPersistence({ limit: 10, page: 1 });
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.close();
  }
}
