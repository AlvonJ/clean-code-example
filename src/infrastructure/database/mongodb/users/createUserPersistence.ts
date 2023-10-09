import { UserInterface } from '../../../../domain/entity/UserEntity.js';
import { client } from '../index.js';
import { getUserPersistence } from './getUserPersistence.js';

export async function createUserPersistence(user: UserInterface) {
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db('clean-architecture');

    const usersCollection = db.collection('users');

    const isFoundDuplicate = await usersCollection.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });

    if (isFoundDuplicate) throw new Error('Email or phone has been registered', { cause: 'DuplicateError' });

    const result = await usersCollection.insertOne(user);

    const insertedUser = await getUserPersistence({ id: result.insertedId.toString() });

    return insertedUser;
  } catch (err) {
    throw new Error(err.message, { cause: err.cause });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// export async function createUserPersistence(user: UserInterface) {
//   // Connect the client to the server
//   await client.connect();

//   // Start session
//   const session = client.startSession();

//   try {
//     // Start transaction
//     return await session.withTransaction(
//       async () => {
//         const db = client.db('clean-architecture');

//         const usersCollection = db.collection('users');

//         const isFound = await usersCollection.findOne({
//           email: user.email,
//         });

//         // await client.db('test-database').collection('test-collection').insertOne({ test: 'test' }, { session });

//         if (isFound !== null) throw new Error('Email has been registered');

//         await usersCollection.insertOne(user, { session });

//         return user;
//       },
//       {
//         readPreference: 'primary',
//         readConcern: { level: 'local' },
//         writeConcern: { w: 'majority' },
//       }
//     );
//   } catch (err) {
//     throw new Error(err);
//   } finally {
//     // End session
//     await session.endSession();
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
