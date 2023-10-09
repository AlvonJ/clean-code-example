import { ContactEntity, ContactInterface } from './ContactEntity.js'; // Import the ContactEntity class and ContactInterface

describe('ContactEntity', () => {
  // Define some sample Contact data for testing
  const sampleContactData: ContactInterface = {
    name: 'Alvon Jovanus',
    phone: '0812314124',
    user_id: '12325320b7681b6c0b567bd5',
  };

  // Test the constructor and validation methods
  it('should create a ContactEntity instance with valid data', () => {
    const contactEntity = new ContactEntity(sampleContactData);

    // Ensure the instance was created successfully
    expect(contactEntity).toBeDefined();

    // Ensure properties are set correctly
    expect(contactEntity.id).toBeUndefined();
    expect(contactEntity.name).toBe(sampleContactData.name);
    expect(contactEntity.phone).toBe(sampleContactData.phone);
    expect(contactEntity.user_id).toBe(sampleContactData.user_id);
    expect(contactEntity.isUpdating).toBe(false);

    // Validate the contact
    expect(() => contactEntity.validate()).not.toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with invalid name', () => {
    const invalidContactData: ContactInterface = {
      name: 'Alvon@Jovanus', // name contains characters
      phone: '0812314124',
      user_id: '12325320b7681b6c0b567bd5',
    };

    expect(() => new ContactEntity(invalidContactData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with invalid phone', () => {
    const invalidContactData: ContactInterface = {
      name: 'Alvon Jovanus',
      phone: '0812314124asd', // phone contains alphabet
      user_id: '12325320b7681b6c0b567bd5',
    };

    expect(() => new ContactEntity(invalidContactData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no name', () => {
    const invalidContactData: ContactInterface = {
      name: undefined,
      phone: '0812314124123',
      user_id: '12325320b7681b6c0b567bd5',
    };

    expect(() => new ContactEntity(invalidContactData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no phone', () => {
    const invalidContactData: ContactInterface = {
      name: 'Alvon Jovanus',
      phone: undefined,
      user_id: '12325320b7681b6c0b567bd5',
    };

    expect(() => new ContactEntity(invalidContactData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no user_id', () => {
    const invalidContactData: ContactInterface = {
      name: 'Alvon Jovanus',
      phone: '0812314124123',
      user_id: undefined,
    };

    expect(() => new ContactEntity(invalidContactData).validate()).toThrow();
  });
});
