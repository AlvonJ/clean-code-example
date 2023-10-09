import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllCalls } from '../../../infrastructure/database/mongodb/calls/utils/deleteAllCalls.js';
import { createFakeCall } from '../../../infrastructure/database/mongodb/calls/utils/createFakeCall.js';

describe('get all calls example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllCalls();
  });

  it('should be able get all user', async () => {
    const app = createApp();

    const data = await createFakeCall();

    const response = await request(app).get('/calls');

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    // data 1
    expect(response.body.data[0]._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data[0].caller).toEqual(data[0].caller);
    expect(response.body.data[0].receiver).toEqual(data[0].receiver);
    expect(response.body.data[0].phone).toEqual(data[0].phone);
    expect(response.body.data[0].start).toEqual(data[0].start);
    expect(response.body.data[0].end).toEqual(data[0].end);
    expect(response.body.data[0].duration).toEqual(data[0].duration);

    // data 2
    expect(response.body.data[1]._id.toString()).toEqual(data[1]._id.toString());
    expect(response.body.data[1].caller).toEqual(data[1].caller);
    expect(response.body.data[1].receiver).toEqual(data[1].receiver);
    expect(response.body.data[1].phone).toEqual(data[1].phone);
    expect(response.body.data[1].start).toEqual(data[1].start);
    expect(response.body.data[1].end).toEqual(data[1].end);
    expect(response.body.data[1].duration).toEqual(data[1].duration);
  });

  it('should be able to limit results', async () => {
    const app = createApp();

    await createFakeCall();

    const response = await request(app).get('/calls').query({ limit: 1 });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.results).toEqual(1);
  });

  it('should be error when no calls found', async () => {
    const app = createApp();

    const response = await request(app).get('/calls');

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No calls found');
  });
});
