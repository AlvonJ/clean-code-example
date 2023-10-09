export interface ContactInterface {
  id?: string;
  name: string;
  phone: string;
  user_id: string;
  isUpdating?: boolean;
}

export class ContactEntity {
  id?: string;
  name: string;
  phone: string;
  user_id: string;
  isUpdating: boolean;

  constructor(contact: ContactInterface) {
    this.id = contact.id;
    this.name = contact.name;
    this.phone = contact.phone;
    this.user_id = contact.user_id;
    this.isUpdating = contact.isUpdating ?? false;
  }

  validate() {
    this.validateName();
    this.validatePhone();
    this.validateUserID();
  }

  private validateName() {
    // If updating and username is null
    if (this.isUpdating && !this.name) return;

    // If name is null
    if (!this.name) throw new Error('Name field is required!', { cause: 'ValidationError' });

    // Check special characters
    if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.name))
      throw new Error('Name cannot contains special characters!', {
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

  private validateUserID() {
    // If updating and user_id is null
    if (this.isUpdating && !this.user_id) return;

    // If user_id is null
    if (!this.user_id) throw new Error('User ID field is required!', { cause: 'ValidationError' });
  }
}
