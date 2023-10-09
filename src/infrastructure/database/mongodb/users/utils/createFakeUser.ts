import { PrivacyEnum, UserInterface } from '../../../../../domain/entity/UserEntity.js';
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
      photo: faker.image.url(),
      status: faker.person.bio(),
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: faker.helpers.enumValue(PrivacyEnum),
        status: faker.helpers.enumValue(PrivacyEnum),
      },
    },
    {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      photo: faker.image.url(),
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: faker.helpers.enumValue(PrivacyEnum),
        status: faker.helpers.enumValue(PrivacyEnum),
      },
    },
    {
      email: faker.internet.email(),
      username: faker.person.firstName(),
      phone: faker.phone.number(),
      password: faker.internet.password(),
      photo: faker.image.url(),
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: faker.helpers.enumValue(PrivacyEnum),
        status: faker.helpers.enumValue(PrivacyEnum),
      },
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
