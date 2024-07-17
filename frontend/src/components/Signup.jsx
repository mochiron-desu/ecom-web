import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { username, email, password } });
      login(data.signup.user, data.signup.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          {loading ? 'Signing up...' : 'Signup'}
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

export default Signup;