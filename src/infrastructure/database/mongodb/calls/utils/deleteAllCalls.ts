import { client } from '../../index.js';

export async function deleteAllCalls() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const callsCollection = db.collection('calls');

    await callsCollection.deleteMany({});
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
