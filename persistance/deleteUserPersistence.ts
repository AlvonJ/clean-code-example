import * as db from 'mysql';

export const deleteUserPersistence = ({ id }: { id: string }) => {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  connection.query(
    `DELETE FROM users WHERE id = '${id}'`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
      }
    }
  );

  connection.end();

  return null;
};
