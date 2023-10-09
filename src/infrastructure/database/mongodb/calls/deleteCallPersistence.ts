import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function deleteCallPersistence({ id }: { id: string }) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const callsCollection = db.collection('calls');

    await callsCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
