import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthForms.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('password must be at least 8 characters long');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'error creating account');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>sign up</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="password (min. 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength="8"
            required
          />
        </div>
        <button type="submit" className="auth-button">sign up</button>
      </form>
      <p className="auth-switch">
        already have an account? <span onClick={() => navigate('/login')}>login</span>
      </p>
    </div>
  );
};

export default SignupForm;
