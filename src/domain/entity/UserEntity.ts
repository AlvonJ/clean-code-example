export interface UserInterface {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  isUpdating?: boolean;
}

export class UserEntity {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  isUpdating: boolean;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.phone = user.phone;
    this.username = user.username;
    this.password = user.password;
    this.isUpdating = user.isUpdating ?? false;
  }

  validate() {
    this.validateEmail();
    this.validatePhone();
    this.validateUsername();
    this.validatePassword();
  }

  private validateEmail() {
    // If updating and email is null
    if (this.isUpdating && !this.email) return;

    if (!this.email.includes('@')) throw new Error('Email must be valid!');
  }

  private validatePhone() {
    // If updating and phone is null
    if (this.isUpdating && !this.phone) return;

    // Check only numbers
    if (!/^[0-9]+$/.test(this.phone))
      throw new Error('Phone number must contains only numbers!');
  }

  private validateUsername() {
    // If updating and username is null
    if (this.isUpdating && !this.username) return;

    // Check special characters
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.username))
      throw new Error('Username cannot contains special characters!');
  }

  private validatePassword() {
    // If updating and password is null
    if (this.isUpdating && !this.password) return;

    if (this.password.length < 6)
      throw new Error('Password length must be greater or equal than 6!');
  }
}
