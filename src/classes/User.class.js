import { roles } from 'src/constants/roles';

class User {
  constructor({ email, password, profile_photo, first_name, last_name, phone_number, role, card_id, appliciant_data }) {
    this.email = email;
    this.password = password;
    this.profile_photo = profile_photo;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.role = role;
    this.card_id = card_id;
    this.appliciant_data = appliciant_data;

    this.validateUser();
    this.validateApplicantData();
  }

  validateUser() {
    if (!this.email || !this.password || !this.first_name || !this.last_name || !this.role || !this.card_id) {
      throw new Error('Missing required fields for user');
    }

    if (!this.isValidEmail(this.email)) {
      throw new Error('Invalid email format');
    }

    if (!this.isValidPassword(this.password)) {
      throw new Error('Password must be at least 6 characters');
    }

    if (!this.isValidPhoneNumber(this.phone_number)) {
      throw new Error('Invalid phone number format');
    }

    if (!Object.values(roles).includes(this.role)) {
      throw new Error('Invalid role');
    }
  }

  // Applicant data validation method
  validateApplicantData() {
    const { field_of_study, school_year, program, experience, experience_details, test_day } = this.appliciant_data;
    if (!field_of_study || !school_year || !program || !experience || !experience_details || !test_day) {
      throw new Error('Missing required fields for applicant data');
    }
  }

  // Helper methods for validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPassword(password) {
    return password.length >= 6;
  }

  isValidPhoneNumber(phone_number) {
    const phoneRegex = /^\d{10}$/; // Assuming 10 digits for phone number validation
    return phoneRegex.test(phone_number);
  }
}

export default User;
