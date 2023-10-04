import { UserEntity, UserInterface } from './UserEntity.js'; // Import the UserEntity class and UserInterface

describe('UserEntity', () => {
  // Define some sample user data for testing
  const sampleUserData: UserInterface = {
    email: 'test@example.com',
    phone: '1234567890',
    username: 'testuser',
    password: 'password123',
  };

  // Test the constructor and validation methods
  it('should create a UserEntity instance with valid data', () => {
    const userEntity = new UserEntity(sampleUserData);

    // Ensure the instance was created successfully
    expect(userEntity).toBeDefined();

    // Ensure properties are set correctly
    expect(userEntity.id).toBeUndefined();
    expect(userEntity.email).toBe(sampleUserData.email);
    expect(userEntity.phone).toBe(sampleUserData.phone);
    expect(userEntity.username).toBe(sampleUserData.username);
    expect(userEntity.password).toBe(sampleUserData.password);
    expect(userEntity.isUpdating).toBe(false);

    // Validate the user
    expect(() => userEntity.validate()).not.toThrow();
  });

  it('should throw an error when creating a UserEntity instance with invalid data', () => {
    const invalidUserData: UserInterface = {
      email: 'invalid-email', // Invalid email
      phone: '1234567890',
      username: 'testuser',
      password: 'short', // Password too short
    };

    expect(() => new UserEntity(invalidUserData).validate()).toThrow();
  });
});
