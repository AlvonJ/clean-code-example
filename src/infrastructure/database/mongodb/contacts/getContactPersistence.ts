import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function getContactPersistence({ id }: { id: string }) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const contactsCollection = db.collection('contacts');

    const result = await contactsCollection.findOne({ _id: new ObjectId(id) });

    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
