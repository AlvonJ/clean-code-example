export interface UserInterface {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}

export class UserEntity {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.phone = user.phone;
    this.username = user.username;
    this.password = user.password;
  }

  validate() {
    this.validateEmail();
    this.validatePhone();
    this.validateUsername();
    this.validatePassword();
  }

  private validateEmail() {
    if (!this.email.includes('@')) throw new Error('Email must be valid!');
  }

  private validatePhone() {
    // Check only numbers
    if (!/^[0-9]+$/.test(this.phone))
      throw new Error('Phone number must contains only numbers!');
  }

  private validateUsername() {
    // Check special characters
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.username))
      throw new Error('Username cannot contains special characters!');
  }

  private validatePassword() {
    if (this.password.length < 6)
      throw new Error('Password length must be greater or equal than 6!');
  }
}
