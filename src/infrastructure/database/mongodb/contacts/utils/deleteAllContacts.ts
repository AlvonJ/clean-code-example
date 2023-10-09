import { client } from '../../index.js';

export async function deleteAllContacts() {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const contactsCollection = db.collection('contacts');

    await contactsCollection.deleteMany({});
  } catch (err) {
    throw new Error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
