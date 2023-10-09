import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllCalls } from '../../../infrastructure/database/mongodb/calls/utils/deleteAllCalls.js';
import { createFakeCall } from '../../../infrastructure/database/mongodb/calls/utils/createFakeCall.js';

describe('delete user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllCalls();
  });

  it('should be able delete call', async () => {
    const app = createApp();

    const data = await createFakeCall();

    const response = await request(app).delete(`/calls/${data[0]._id.toString()}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});
  });
});
