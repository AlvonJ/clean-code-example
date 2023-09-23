import { ObjectId } from 'mongodb';
import { UserInterface } from '../../../domain/entity/UserEntity.js';
import { client } from './index.js';

export async function updateUserPersistence(user: UserInterface) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    const updateUser = {
      $set: {
        username: user.username,
        phone: user.phone,
        email: user.email,
        password: user.password,
      },
    };

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(user.id) },
      updateUser
    );

    if (result.matchedCount === 0) throw new Error('User not found!');

    return user;
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
