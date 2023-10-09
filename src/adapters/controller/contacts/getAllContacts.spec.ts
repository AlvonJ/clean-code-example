import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllContacts } from '../../../infrastructure/database/mongodb/contacts/utils/deleteAllContacts.js';
import { createFakeContact } from '../../../infrastructure/database/mongodb/contacts/utils/createFakeContact.js';

describe('get all contacts example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllContacts();
  });

  it('should be able get all user', async () => {
    const app = createApp();

    const data = await createFakeContact();

    const response = await request(app).get('/contacts');

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    // data 1
    expect(response.body.data[0]._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data[0].name).toEqual(data[0].name);
    expect(response.body.data[0].phone).toEqual(data[0].phone);
    expect(response.body.data[0].user_id).toEqual(data[0].user_id);
    expect(response.body.data[0].created_at).toEqual(data[0].created_at);

    // data 2
    expect(response.body.data[1]._id.toString()).toEqual(data[1]._id.toString());
    expect(response.body.data[1].name).toEqual(data[1].name);
    expect(response.body.data[1].phone).toEqual(data[1].phone);
    expect(response.body.data[1].user_id).toEqual(data[1].user_id);
    expect(response.body.data[1].created_at).toEqual(data[1].created_at);
  });

  it('should be able to limit results', async () => {
    const app = createApp();

    await createFakeContact();

    const response = await request(app).get('/contacts').query({ limit: 1 });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.results).toEqual(1);
  });

  it('should be error when no contacts found', async () => {
    const app = createApp();

    const response = await request(app).get('/contacts');

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No contacts found');
  });
});
