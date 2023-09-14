import * as db from 'mysql';

export async function updateUserPersistence({
  id,
  username,
  password,
}: {
  id: string;
  username: string;
  password: string;
}) {
  const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
  });

  connection.connect();

  const updatedUser = connection.query(
    `UPDATE users SET username = '${username}', password = '${password}' WHERE id = ${id}`,
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
