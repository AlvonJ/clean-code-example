import request from 'supertest';
import { createApp } from '../../../app.js';
import { UserInterface } from '../../../domain/entity/UserEntity.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';

describe('delete user example', () => {
  beforeEach(async () => {
    await deleteAllUser();
  });

  it('should be able delete user', async () => {
    const app = createApp();

    const data = await createFakeUser();

    const response = await request(app).delete(
      `/users/${data[0]._id.toString()}`
    );

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});
  });
});
