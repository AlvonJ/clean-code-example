import { UserInterface } from './UserEntity.js';

export interface CallInterface {
  id?: string;
  caller: UserInterface;
  receiver: UserInterface;
  start: number;
  end: number;
  duration: number;
}

export class CallEntity {
  id?: string;
  caller: UserInterface;
  receiver: UserInterface;
  start: number;
  end: number;
  duration: number;

  constructor(call: CallInterface) {
    this.id = call.id;
    this.caller = call.caller;
    this.receiver = call.receiver;
    this.start = call.start;
    this.end = call.end;
    this.duration = call.duration;
  }

  validate() {
    this.validateTimeValues();
    this.validateCaller();
    this.validateReceiver();
    this.validateStart();
    this.validateEnd();
    this.validateDuration();
  }

  private validateCaller() {
    // If caller is null
    if (!this.caller) throw new Error('Caller field is required', { cause: 'ValidationError' });
  }

  private validateReceiver() {
    // If caller is null
    if (!this.receiver) throw new Error('Receiver field is required', { cause: 'ValidationError' });
  }

  private validateStart() {
    // If start is null
    if (!this.start) throw new Error('Start field is required', { cause: 'ValidationError' });
  }

  private validateEnd() {
    // If end is null
    if (!this.end) throw new Error('End field is required', { cause: 'ValidationError' });
  }

  private validateDuration() {
    // If duration is null
    if (!this.duration) throw new Error('Duration field is required', { cause: 'ValidationError' });
  }

  private validateTimeValues() {
    if (this.start > this.end || this.duration < 0)
      throw new Error('Invalid time values', { cause: 'ValidationError' });
  }
}
