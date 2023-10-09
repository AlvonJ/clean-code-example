export interface UserInterface {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  photo?: string;
  status?: string;
  privacy?: PrivacyInterface;
  isUpdating?: boolean;
}

export enum PrivacyEnum {
  EVERYONE = 'everyone',
  MYCONTACTS = 'my_contacts',
  NOBODY = 'nobody',
}

export interface PrivacyInterface {
  last_seen?: PrivacyEnum;
  photo?: PrivacyEnum;
  status?: PrivacyEnum;
}
export class UserEntity {
  id?: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  photo?: string;
  status?: string;
  privacy: PrivacyInterface;
  isUpdating: boolean;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.phone = user.phone;
    this.username = user.username;
    this.password = user.password;
    this.photo = user.photo;
    this.status = user.status;
    this.privacy = this.initializePrivacy(user.privacy);
    this.isUpdating = user.isUpdating ?? false;
  }

  private initializePrivacy(privacy?: PrivacyInterface): PrivacyInterface {
    return {
      last_seen: privacy?.last_seen || PrivacyEnum.EVERYONE,
      photo: privacy?.photo || PrivacyEnum.EVERYONE,
      status: privacy?.status || PrivacyEnum.EVERYONE,
    };
  }

  validate() {
    this.validateEmail();
    this.validatePhone();
    this.validateUsername();
    this.validatePassword();
    this.validatePhoto();
  }

  private validateEmail() {
    // If updating and email is null
    if (this.isUpdating && !this.email) return;

    // If email is null
    if (!this.email) throw new Error('Email field is required!', { cause: 'ValidationError' });

    if (!this.email.includes('@'))
      throw new Error('Email must be valid!', {
        cause: 'ValidationError',
      });
  }

  private validatePhone() {
    // If updating and phone is null
    if (this.isUpdating && !this.phone) return;

    // If phone is null
    if (!this.phone) throw new Error('Phone field is required!', { cause: 'ValidationError' });

    // Check only numbers
    if (!/^[0-9]+$/.test(this.phone))
      throw new Error('Phone number must contains only numbers!', {
        cause: 'ValidationError',
      });
  }

  private validateUsername() {
    // If updating and username is null
    if (this.isUpdating && !this.username) return;

    // If username is null
    if (!this.username) throw new Error('Username field is required!', { cause: 'ValidationError' });

    // Check special characters
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.username))
      throw new Error('Username cannot contains special characters!', {
        cause: 'ValidationError',
      });
  }

  private validatePassword() {
    // If updating and password is null
    if (this.isUpdating && !this.password) return;

    // If password is null
    if (!this.password) throw new Error('Password field is required!', { cause: 'ValidationError' });

    if (this.password.length < 6)
      throw new Error('Password length must be greater or equal than 6!', {
        cause: 'ValidationError',
      });
  }

  private validatePhoto() {
    if (!this.photo) return;

    // Check valid photo URL
    if (!/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i.test(this.photo)) {
      throw new Error('Photo url is not valid!', {
        cause: 'ValidationError',
      });
    }
  }
}
