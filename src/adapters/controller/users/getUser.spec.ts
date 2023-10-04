import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';

describe('get one user example', () => {
  beforeEach(async () => {
    await deleteAllUser();
  });

  it('should be able get one user', async () => {
    const app = createApp();

    const data = await createFakeUser();

    const response = await request(app).get(`/users/${data[0]._id.toString()}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data.username).toEqual(data[0].username);
    expect(response.body.data.email).toEqual(data[0].email);
    expect(response.body.data.phone).toEqual(data[0].phone);
    expect(response.body.data.password).toEqual(data[0].password);
  });
});
