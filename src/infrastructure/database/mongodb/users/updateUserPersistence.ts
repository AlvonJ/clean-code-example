import { ObjectId } from 'mongodb';
import { UserInterface } from '../../../../domain/entity/UserEntity.js';
import { client } from '../index.js';
import { getUserPersistence } from './getUserPersistence.js';

function cleanNullValues(obj: Object): void {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export async function updateUserPersistence(user: UserInterface) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    const updateValues = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
      status: user.status,
      photo: user.photo,
      privacy: user.privacy,
    };

    cleanNullValues(updateValues);

    const updateUser = {
      $set: updateValues,
    };

    const result = await usersCollection.updateOne({ _id: new ObjectId(user.id) }, updateUser);

    if (result.matchedCount === 0) throw new Error('No users found with that id!', { cause: 'DataNotFound' });

    return getUserPersistence({ id: user.id });
  } catch (err) {
    throw new Error(err.message, { cause: err.cause });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
