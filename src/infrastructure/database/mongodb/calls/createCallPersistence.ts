import { CallInterface } from '../../../../domain/entity/CallEntity.js';
import { client } from '../index.js';
import { getCallPersistence } from './getCallPersistence.js';

export async function createCallPersistence(call: CallInterface) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const callsCollection = db.collection('calls');

    const result = await callsCollection.insertOne(call);

    const insertedCall = await getCallPersistence({ id: result.insertedId.toString() });

    return insertedCall;
  } catch (err) {
    throw new Error(err.message, { cause: err.cause });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
