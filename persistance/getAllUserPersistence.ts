import * as db from 'mysql';

export const getAllUserPersistence = () => {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const users = connection.query(
    `SELECT * FROM users`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
      } else {
        return results;
      }
    }
  );

  connection.end();

  return users;
};
