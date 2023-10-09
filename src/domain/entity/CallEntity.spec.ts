import { CallEntity, CallInterface } from './CallEntity.js'; // Import the CallEntity class and CallInterface
import { PrivacyEnum } from './UserEntity.js';

describe('CallEntity', () => {
  // Define some sample Call data for testing
  const sampleCallData: CallInterface = {
    caller: {
      id: '65225a19d519240b8d2babb9',
      username: 'Test 5',
      password: '123456',
      email: 'test10@gmail.com',
      phone: '0812321321321',
      status: 'Hallo',
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: PrivacyEnum.EVERYONE,
        status: PrivacyEnum.EVERYONE,
      },
      photo: null,
    },
    receiver: {
      id: '6522aa2a1599bcda88058fb9',
      username: 'Test 1',
      password: '123456',
      email: 'test1@gmail.com',
      phone: '0823232131',
      status: 'Haha',
      privacy: {
        last_seen: PrivacyEnum.EVERYONE,
        photo: PrivacyEnum.EVERYONE,
        status: PrivacyEnum.EVERYONE,
      },
      photo: null,
    },
    start: 12321113,
    end: 12321114,
    duration: 1,
  };

  // Test the constructor and validation methods
  it('should create a CallEntity instance with valid data', () => {
    const callEntity = new CallEntity(sampleCallData);

    // Ensure the instance was created successfully
    expect(callEntity).toBeDefined();

    // Ensure properties are set correctly
    expect(callEntity.id).toBeUndefined();

    expect(callEntity.caller.id).toBe(sampleCallData.caller.id);
    expect(callEntity.caller.username).toBe(sampleCallData.caller.username);
    expect(callEntity.caller.password).toBe(sampleCallData.caller.password);
    expect(callEntity.caller.email).toBe(sampleCallData.caller.email);
    expect(callEntity.caller.privacy).toBe(sampleCallData.caller.privacy);

    expect(callEntity.receiver.id).toBe(sampleCallData.receiver.id);
    expect(callEntity.receiver.username).toBe(sampleCallData.receiver.username);
    expect(callEntity.receiver.password).toBe(sampleCallData.receiver.password);
    expect(callEntity.receiver.email).toBe(sampleCallData.receiver.email);
    expect(callEntity.receiver.privacy).toBe(sampleCallData.receiver.privacy);

    expect(callEntity.start).toBe(sampleCallData.start);
    expect(callEntity.end).toBe(sampleCallData.end);
    expect(callEntity.duration).toBe(sampleCallData.duration);

    // Validate the call
    expect(() => callEntity.validate()).not.toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no caller', () => {
    const invalidCallData: CallInterface = {
      caller: undefined,
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      start: 12321113,
      end: 12321114,
      duration: 1,
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no receiver', () => {
    const invalidCallData: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      receiver: undefined,
      start: 12321113,
      end: 12321114,
      duration: 1,
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no start', () => {
    const invalidCallData: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      start: undefined,
      end: 12321114,
      duration: 1,
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no end', () => {
    const invalidCallData: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      start: 12321113,
      end: undefined,
      duration: 1,
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with no duration', () => {
    const invalidCallData: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      start: 12321113,
      end: 12321114,
      duration: undefined,
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });

  it('should throw an error when creating a ContactEntity instance with invalid time value', () => {
    const invalidCallData: CallInterface = {
      caller: {
        id: '65225a19d519240b8d2babb9',
        username: 'Test 5',
        password: '123456',
        email: 'test10@gmail.com',
        phone: '0812321321321',
        status: 'Hallo',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      receiver: {
        id: '6522aa2a1599bcda88058fb9',
        username: 'Test 1',
        password: '123456',
        email: 'test1@gmail.com',
        phone: '0823232131',
        status: 'Haha',
        privacy: {
          last_seen: PrivacyEnum.EVERYONE,
          photo: PrivacyEnum.EVERYONE,
          status: PrivacyEnum.EVERYONE,
        },
        photo: null,
      },
      start: 12321113,
      end: 12321114,
      duration: -2, // duration < 0
    };

    expect(() => new CallEntity(invalidCallData).validate()).toThrow();
  });
});
