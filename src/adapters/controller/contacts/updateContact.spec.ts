import request from 'supertest';
import { createApp } from '../../../app.js';
import { deleteAllContacts } from '../../../infrastructure/database/mongodb/contacts/utils/deleteAllContacts.js';
import { createFakeContact } from '../../../infrastructure/database/mongodb/contacts/utils/createFakeContact.js';

describe('update one contact example', () => {
  beforeEach(async () => {
    jest.setTimeout(20000);
    await deleteAllContacts();
  });

  it('should be able update one contact', async () => {
    const app = createApp();

    const data = await createFakeContact();

    const updatedContact = {
      name: 'Updated Name',
    };

    const response = await request(app).patch(`/contacts/${data[0]._id.toString()}`).send(updatedContact);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.data.name).not.toEqual(data[0].name);
  });

  it('should be error when no contact found with that ID', async () => {
    const app = createApp();

    const updatedContact = {
      name: 'Updated Name',
    };

    const response = await request(app).patch(`/contacts/12325320b7681b6c0b567bd5`).send(updatedContact);

    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('No contacts found with that id!');
  });
});
