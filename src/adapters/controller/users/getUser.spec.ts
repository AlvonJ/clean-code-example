import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';
import { createFakeUser } from '../../../infrastructure/database/mongodb/users/utils/createFakeUser.js';

describe('get one user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
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
    expect(response.body.data.status).toEqual(data[0].status);
    expect(response.body.data.photo).toEqual(data[0].photo);
    expect(response.body.data.privacy).toEqual(data[0].privacy);
  });

  it('should be error when no user found', async () => {
    const app = createApp();

    const response = await request(app).get(`/users/12325320b7681b6c0b567bd5`);

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No users found with that ID');
  });
});
