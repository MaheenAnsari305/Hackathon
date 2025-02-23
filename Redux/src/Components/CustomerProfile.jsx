import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, Paper, Grid, Avatar } from '@mui/material';
import { blue } from '@mui/material/colors';

const CustomerProfile = () => {
  // Example customer data (can be dynamically fetched from a database)
  const [customerID, setCustomerID] = useState('C001');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [address, setAddress] = useState('123 Main St, Springfield, USA');
  const [bookingHistory, setBookingHistory] = useState('Room A - 3 nights, Room B - 2 nights');

  const [isEditing, setIsEditing] = useState(false);  // Flag to toggle between view and edit mode

  // Handle form update
  const handleUpdateProfile = () => {
    // Here, you'd typically make an API call to update the profile in the database
    console.log('Profile updated', { customerID, name, email, phone, address, bookingHistory });
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        padding: '20px',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: '40px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          sx={{
            color: '#333',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Customer Profile
        </Typography>

        <Divider sx={{ marginBottom: '20px' }} />

        {/* Avatar Section with Customer ID */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              backgroundColor: blue[500],
              fontSize: '50px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            {name.split(' ')[0][0]}
          </Avatar>
        </Box>

        {/* Customer ID Section */}
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
            Customer ID: <span style={{ color: '#4CAF50' }}>{customerID}</span>
          </Typography>
        </Box>

        {/* Profile Details */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
            {isEditing ? (
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: '100%' }}
              />
            ) : (
              <Typography variant="body2">{name}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
            {isEditing ? (
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '100%' }}
              />
            ) : (
              <Typography variant="body2">{email}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
            {isEditing ? (
              <TextField
                label="Phone"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ width: '100%' }}
              />
            ) : (
              <Typography variant="body2">{phone}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address:</Typography>
            {isEditing ? (
              <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ width: '100%' }}
              />
            ) : (
              <Typography variant="body2">{address}</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Booking History:</Typography>
            {isEditing ? (
              <TextField
                label="Booking History"
                variant="outlined"
                value={bookingHistory}
                onChange={(e) => setBookingHistory(e.target.value)}
                sx={{ width: '100%' }}
              />
            ) : (
              <Typography variant="body2">{bookingHistory}</Typography>
            )}
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
          {isEditing ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              sx={{
                padding: '10px 30px',
                fontWeight: 'bold',
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
              }}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{
                padding: '10px 30px',
                fontWeight: 'bold',
                backgroundColor: '#FF9800',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CustomerProfile;
