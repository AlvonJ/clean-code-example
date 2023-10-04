import * as db from 'mysql';

import { UserInterface } from '../../../../domain/entity/UserEntity.js';

export async function updateUserPersistence(user: UserInterface) {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const updatedUser = connection.query(
    `UPDATE users SET username = '${user.username}', password = '${user.password}' WHERE id = ${user.id}`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
      } else {
        return results;
      }
    }
  );

  connection.end();

  return updatedUser;
}
