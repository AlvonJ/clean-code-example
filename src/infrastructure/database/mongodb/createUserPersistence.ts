import { UserInterface } from '../../../domain/entity/UserEntity.js';
import { client } from './index.js';

export async function createUserPersistence(user: UserInterface) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    const isFound = await usersCollection.findOne({
      email: user.email,
    });

    if (isFound !== null) throw new Error('Email has been registered');

    await usersCollection.insertOne(user);

    return user;
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
