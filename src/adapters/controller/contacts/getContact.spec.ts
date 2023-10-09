import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllContacts } from '../../../infrastructure/database/mongodb/contacts/utils/deleteAllContacts.js';
import { createFakeContact } from '../../../infrastructure/database/mongodb/contacts/utils/createFakeContact.js';

describe('get one contact example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllContacts();
  });

  it('should be able get one contact', async () => {
    const app = createApp();

    const data = await createFakeContact();

    const response = await request(app).get(`/contacts/${data[0]._id.toString()}`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data._id.toString()).toEqual(data[0]._id.toString());
    expect(response.body.data.name).toEqual(data[0].name);
    expect(response.body.data.phone).toEqual(data[0].phone);
    expect(response.body.data.user_id).toEqual(data[0].user_id);
  });

  it('should be error when no contact found', async () => {
    const app = createApp();

    const response = await request(app).get(`/contacts/12325320b7681b6c0b567bd5`);

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No contacts found with that ID');
  });
});
