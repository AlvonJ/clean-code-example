import { ContactInterface } from '../../../../domain/entity/ContactEntity.js';
import { client } from '../index.js';
import { getContactPersistence } from './getContactPersistence.js';
import { ObjectId } from 'mongodb';

export async function createContactPersistence(contact: ContactInterface) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const contactsCollection = db.collection('contacts');
    const usersCollection = db.collection('users');

    // Check if User ID is exist
    const isFoundUser = await usersCollection.findOne({ _id: new ObjectId(contact.user_id) });
    if (!isFoundUser) throw new Error('User ID is not exist!', { cause: 'DataNotFound' });

    // Check if Phone already in the User ID
    const isFoundDuplicate = await contactsCollection.findOne({
      $and: [{ phone: contact.phone }, { user_id: contact.user_id }],
    });
    if (isFoundDuplicate) throw new Error('Phone has been registered in this user ID!', { cause: 'DuplicateError' });

    const result = await contactsCollection.insertOne(contact);

    const insertedContact = await getContactPersistence({ id: result.insertedId.toString() });

    return insertedContact;
  } catch (err) {
    throw new Error(err.message, { cause: err.cause });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
