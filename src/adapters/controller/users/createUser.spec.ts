import request from 'supertest';
import { createApp } from '../../../app.js';
import { UserInterface } from '../../../domain/entity/UserEntity.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';

describe('create user example', () => {
  beforeEach(async () => {
    await deleteAllUser();
  });

  it('should be able to create an example', async () => {
    const app = createApp();

    const data: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
    };

    const response = await request(app).post('/users').send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.username).toEqual(data.username);
    expect(response.body.data.email).toEqual(data.email);
    expect(response.body.data.phone).toEqual(data.phone);
    expect(response.body.data.password).toEqual(data.password);
  });
});
