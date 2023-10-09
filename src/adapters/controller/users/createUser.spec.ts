import request from 'supertest';
import { createApp } from '../../../app.js';
import { PrivacyEnum, UserInterface } from '../../../domain/entity/UserEntity.js';
import { deleteAllUser } from '../../../infrastructure/database/mongodb/users/utils/deleteAllUser.js';

describe('create user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllUser();
  });

  it('should be able to create an example', async () => {
    const app = createApp();

    const data: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
      photo: 'asdaada.jpg',
      status: 'Available',
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: PrivacyEnum.MYCONTACTS,
        status: PrivacyEnum.NOBODY,
      },
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
    expect(response.body.data.photo).toEqual(data.photo);
    expect(response.body.data.status).toEqual(data.status);
    expect(response.body.data.privacy).toEqual(data.privacy);
  });

  it('duplicate error should occured if email or phone is duplicate', async () => {
    const app = createApp();

    const data1: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
      photo: 'asdaada.jpg',
    };

    const data2: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
      photo: 'asdaada.jpg',
    };

    const response1 = await request(app).post('/users').send(data1);
    const response2 = await request(app).post('/users').send(data2);

    expect(response2.statusCode).toEqual(400);
    expect(response2.body.status).toBe('error');
    expect(response2.body.message).toBe('Email or phone has been registered');
  });

  it('validating error should occured if fields is not correct', async () => {
    const app = createApp();

    const data: UserInterface = {
      username: 'test12345',
      email: 'test12345', // Invalid email
      phone: '0123312312321',
      password: '12345678',
    };

    const response = await request(app).post('/users').send(data);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Email must be valid!');
  });
});
