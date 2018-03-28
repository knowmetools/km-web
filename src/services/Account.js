import Axios from 'axios';

import { API_ROOT } from '../settings';


class Account {
  /**
   * Reset a user's email address.
   *
   * @param {string} key The key that the user was emailed to reset their password.
   * @param {string} password The user's new password.
   *
   * @returns {Promise} A promise that resolves to the data received from the reset endpoint.
   */
  static async resetPassword(key, password) {
    const response = await Axios.post(`${API_ROOT}/account/reset-password/`, { key, password });

    return response.data;
  }

  /**
   * Verify a user's email address.
   *
   * @param {string} key The key that the user was emailed to verify their email address.
   * @param {string} password The user's password.
   *
   * @returns {Promise} A promise that resolves to the data received from the verification request.
   */
  static verifyEmail(key, password) {
    return Axios.post(`${API_ROOT}/account/verify-email/`, { key, password })
      .then(response => response.data);
  }
}


export default Account;
