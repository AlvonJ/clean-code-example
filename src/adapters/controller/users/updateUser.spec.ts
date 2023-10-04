import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';

describe('update one user example', () => {
  beforeEach(async () => {
    await deleteAllUser();
  });

  it('should be able update one user', async () => {
    const app = createApp();

    const data = await createFakeUser();

    const updatedUsername = {
      username: 'updated username',
    };

    const response = await request(app)
      .patch(`/users/${data[0]._id.toString()}`)
      .send(updatedUsername);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data.username).not.toEqual(data[0].username);
  });
});
