import * as db from 'mysql';

export const getUserPersistence = ({ id }: { id: string }) => {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const user = connection.query(
    `SELECT * FROM users WHERE id = '${id}'`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
      } else {
        return results;
      }
    }
  );

  connection.end();

  return user;
};
