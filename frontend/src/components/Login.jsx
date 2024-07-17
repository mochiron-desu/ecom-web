import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      authLogin(data.login.user, data.login.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      {error && (
        <Typography color="error" align="center" style={{ marginTop: '1rem' }}>
          {error.message}
        </Typography>
      )}
    </Container>
  );
}

export default Login;