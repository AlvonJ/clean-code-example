import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllContacts } from '../../../infrastructure/database/mongodb/contacts/utils/deleteAllContacts.js';
import { createFakeContact } from '../../../infrastructure/database/mongodb/contacts/utils/createFakeContact.js';

describe('delete user example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllContacts();
  });

  it('should be able delete contact', async () => {
    const app = createApp();

    const data = await createFakeContact();

    const response = await request(app).delete(`/contacts/${data[0]._id.toString()}`);

    // expect http response
    expect(response.statusCode).toEqual(204);

    // expect response json
    expect(response.body).toStrictEqual({});
  });
});
