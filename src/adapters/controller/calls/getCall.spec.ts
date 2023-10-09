import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllCalls } from '../../../infrastructure/database/mongodb/calls/utils/deleteAllCalls.js';
import { createFakeCall } from '../../../infrastructure/database/mongodb/calls/utils/createFakeCall.js';

describe('get one call example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllCalls();
  });

  it('should be able get one call', async () => {
    const app = createApp();

    const data = await createFakeCall();

    const response = await request(app).get(`/calls/${data[0]._id.toString()}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data.caller).toEqual(data[0].caller);
    expect(response.body.data.receiver).toEqual(data[0].receiver);
    expect(response.body.data.start).toEqual(data[0].start);
    expect(response.body.data.end).toEqual(data[0].end);
    expect(response.body.data.duration).toEqual(data[0].duration);
  });

  it('should be error when no call found', async () => {
    const app = createApp();

    const response = await request(app).get(`/calls/12325320b7681b6c0b567bd5`);

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No calls found with that ID');
  });
});
