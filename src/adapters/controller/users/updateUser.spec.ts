import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';
import { PrivacyEnum } from '../../../domain/entity/UserEntity.js';

describe('update one user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllUser();
  });

  it('should be able update one user', async () => {
    const app = createApp();

    const data = await createFakeUser();

    const updatedUsername = {
      username: 'updated username',
      privacy: {
        last_seen: PrivacyEnum.NOBODY,
      },
    };

    const response = await request(app).patch(`/users/${data[0]._id.toString()}`).send(updatedUsername);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data.username).not.toEqual(data[0].username);
    expect(response.body.data.privacy.last_seen).not.toEqual(data[0].privacy.last_seen);
  });

  it('should be error when no user found with that ID', async () => {
    const app = createApp();

    const updatedUsername = {
      username: 'updated username',
      privacy: {
        last_seen: PrivacyEnum.NOBODY,
      },
    };

    const response = await request(app).patch(`/users/12325320b7681b6c0b567bd5`).send(updatedUsername);

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No users found with that id!');
  });
});
