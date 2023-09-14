export class UserEntity {
  username: string;
  password: string;

  constructor({ username, password }: { username: string; password: string }) {
    this.username = username;
    this.password = password;
  }

  validate() {
    if (this.password.length < 6) {
      throw new Error('Password length must be greater than 6');
    }
  }
}
