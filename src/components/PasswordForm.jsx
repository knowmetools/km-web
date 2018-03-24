import React from 'react';


/**
 * Form for prompting the user for their password.
 */
class PasswordForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();

    alert("Password form submitted.");
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label for="password">Password</label>
        <input
          autocomplete="current-password"
          autofocus
          id="password"
          name="password"
          required
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}


export default PasswordForm;
