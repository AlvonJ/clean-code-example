import request from 'supertest';
import { createApp } from '../../../app.js';
import { CallInterface } from '../../../domain/entity/CallEntity.js';
import { deleteAllContacts } from '../../../infrastructure/database/mongodb/contacts/utils/deleteAllContacts.js';

describe('create call example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllContacts();
  });

  it('should be able to create an example', async () => {
    const app = createApp();

    const data: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        photo: null,
      },
      start: 12321113,
      end: 12321114,
      duration: 1,
    };

    const response = await request(app).post('/calls').send(data);

    // expect http response
    expect(response.statusCode).toEqual(201);

    // expect response json
    expect(response.body.data._id).toBeDefined();

    expect(response.body.data.caller).toEqual(data.caller);
    expect(response.body.data.caller.username).toEqual(data.caller.username);
    expect(response.body.data.caller.email).toEqual(data.caller.email);
    expect(response.body.data.caller.phone).toEqual(data.caller.phone);

    expect(response.body.data.receiver).toEqual(data.receiver);
    expect(response.body.data.receiver.username).toEqual(data.receiver.username);
    expect(response.body.data.receiver.email).toEqual(data.receiver.email);
    expect(response.body.data.receiver.phone).toEqual(data.receiver.phone);

    expect(response.body.data.start).toEqual(data.start);
    expect(response.body.data.end).toEqual(data.end);
    expect(response.body.data.duration).toEqual(data.duration);
  });

  it('validating error should occured if data is invalid', async () => {
    const app = createApp();

    const data: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        photo: null,
      },
      start: 12321113,
      end: 12321114,
      duration: -2, // Invalid duration
    };

    const response = await request(app).post('/calls').send(data);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
    expect(response.body.message).toBe('Invalid time values');
  });
});
