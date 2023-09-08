import * as db from 'mysql';

export const createUserPersistence = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const user = connection.query(
    `INSERT INTO users (username, password) VALUES (${username}, ${password})`,
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
