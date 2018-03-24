import Axios from 'axios';


class Account {
  /**
   * Verify a user's email address.
   *
   * @param {string} key The key that the user was emailed to verify their email address.
   * @param {string} password The user's password.
   *
   * @returns {Promise} A promise that resolves to the data received from the verification request.
   */
  static verifyEmail(key, password) {
    return Axios.post('https://dev.toolbox.knowmetools.com/account/verify-email/', { key, password })
      .then(response => response.data);
  }
}


export default Account;
