import React, { useState } from 'react';

function LoginForm() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve the stored details from localStorage
    const storedDetailsString = localStorage.getItem('userSignupDetails');

    if (storedDetailsString) {
      // Use JSON.parse() to convert the string back into an object
      const storedDetails = JSON.parse(storedDetailsString);

      // Compare the entered values with the stored values
      if (
        loginEmail === storedDetails.email &&
        loginPassword === storedDetails.password
      ) {
        alert('Login successful!');
        // Proceed with user session setup
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('No user details found. Please sign up first.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
