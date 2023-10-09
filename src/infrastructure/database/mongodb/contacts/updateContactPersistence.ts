import { ObjectId } from 'mongodb';
import { ContactInterface } from '../../../../domain/entity/ContactEntity.js';
import { client } from '../index.js';
import { getContactPersistence } from './getContactPersistence.js';

function cleanNullValues(obj: Object): void {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

export async function updateContactPersistence(contact: ContactInterface) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const contactsCollection = db.collection('contacts');

    const updateValues = {
      name: contact.name,
      phone: contact.phone,
    };

    cleanNullValues(updateValues);

    const updatecontact = {
      $set: updateValues,
    };

    const result = await contactsCollection.updateOne({ _id: new ObjectId(contact.id) }, updatecontact);

    if (result.matchedCount === 0) throw new Error('No contacts found with that id!', { cause: 'DataNotFound' });

    return getContactPersistence({ id: contact.id });
  } catch (err) {
    throw new Error(err.message, { cause: err.cause });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
