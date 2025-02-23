import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';

const UserManagement = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  
  const handleRegister = () => {
    if (users.find(user => user.email === email)) {
      setMessage('Email already exists!');
      return;
    }

  
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, 
      role,
      contactInfo,
    };

    
    setUsers([...users, newUser]);

    
    setName('');
    setEmail('');
    setPassword('');
    setRole('');
    setContactInfo('');

    setMessage('User registered successfully!');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f4f4f9',
        padding: '90px 60px',
        marginRight:'90px',
        marginTop:'50px',
        borderRadius: '8px',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#333',
            marginBottom: '5px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          User Management
        </Typography>

        <Divider sx={{ marginBottom: '20px' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '100%' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '100%' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: '100%' }}
          />
          <TextField
            label="Role (e.g., Admin or Client)"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ width: '100%' }}
          />
          <TextField
            label="Contact Info"
            variant="outlined"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            sx={{ width: '100%' }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleRegister}
            sx={{
              padding: '12px',
              fontWeight: 'bold',
              marginTop: '20px',
              backgroundColor: '#F44886',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
          >
            Register User
          </Button>

          {message && (
            <Typography
              sx={{
                marginTop: '15px',
                color: message.includes('success') ? 'green' : 'red',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
