import { ObjectId } from 'mongodb';
import { client } from './index.js';

export async function deleteUserPersistence({ id }: { id: string }) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    await usersCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
