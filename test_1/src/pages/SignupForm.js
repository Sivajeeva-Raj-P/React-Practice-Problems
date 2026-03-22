import React, { useState } from 'react';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Create an object with the signup details
    const userDetails = { email, password };

    // Save the object to localStorage
    // Use JSON.stringify() to convert the object into a string
    localStorage.setItem('userSignupDetails', JSON.stringify(userDetails));

    alert('Sign up details saved!');
    // Redirect user or clear form as needed
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
