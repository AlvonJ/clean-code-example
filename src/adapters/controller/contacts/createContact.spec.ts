import request from 'supertest';
import { createApp } from '../../../app.js';
import { ContactInterface } from '../../../domain/entity/ContactEntity.js';
import { UserInterface } from '../../../domain/entity/UserEntity.js';
import { resetDatabase } from '../../../infrastructure/database/mongodb/utils/resetDatabase.js';

describe('create contact example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await resetDatabase();
  });

  it('should be able to create an example', async () => {
    const app = createApp();

    const user: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
      photo: 'asdaada.jpg',
      status: 'Available',
    };

    const responseUser = await request(app).post('/users').send(user);

    const data: ContactInterface = {
      name: 'Test Contact',
      phone: '0812321312312',
      user_id: responseUser.body.data._id.toString(),
    };

    const response = await request(app).post('/contacts').send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body.data._id).toBeDefined();
    expect(response.body.data.name).toEqual(data.name);
    expect(response.body.data.phone).toEqual(data.phone);
    expect(response.body.data.user_id).toEqual(data.user_id);
  });

  it('duplicate error should occured if phone and user_id is duplicate', async () => {
    const app = createApp();

    const user: UserInterface = {
      username: 'test12345',
      email: 'test12345@gmail.com',
      phone: '0123312312321',
      password: '12345678',
      photo: 'asdaada.jpg',
      status: 'Available',
    };

    const responseUser = await request(app).post('/users').send(user);

    const data1: ContactInterface = {
      name: 'Test Contact',
      phone: '0812321312312',
      user_id: responseUser.body.data._id.toString(),
    };

    const data2: ContactInterface = {
      name: 'Test Contact',
      phone: '0812321312312',
      user_id: responseUser.body.data._id.toString(),
    };

    const response1 = await request(app).post('/contacts').send(data1);
    const response2 = await request(app).post('/contacts').send(data2);

    expect(response2.statusCode).toEqual(400);
    expect(response2.body.status).toBe('error');
  });

  it('validating error should occured if fields is not correct', async () => {
    const app = createApp();

    const data: ContactInterface = {
      name: 'Test Contact',
      phone: '0812321312312a', // Invalid phone number
      user_id: '12325320b7681b6c0b567bd5',
    };

    const response = await request(app).post('/contacts').send(data);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Phone number must contains only numbers!');
  });

  it('data not found error should occured if user_id is not found', async () => {
    const app = createApp();

    const data: ContactInterface = {
      name: 'Test Contact',
      phone: '0812321312312',
      user_id: '12325320b7681b6c0b567bd5', // No user ID found
    };

    const response = await request(app).post('/contacts').send(data);

    expect(response.status).toBe(404);
    expect(response.body.status).toBe('error');
  });
});
