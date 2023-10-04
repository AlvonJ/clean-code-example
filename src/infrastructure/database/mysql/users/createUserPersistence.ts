import * as db from 'mysql';

import { UserInterface } from '../../../../domain/entity/UserEntity.js';

export async function createUserPersistence(user: UserInterface) {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const newUser = connection.query(
    `INSERT INTO users (username, password, phone, email) VALUES (${user.username}, ${user.password}, ${user.phone}, ${user.email})`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
      } else {
        return results;
      }
    }
  );

  connection.end();

  return newUser;
}
