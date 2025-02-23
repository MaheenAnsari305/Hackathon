import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Grid, Container, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';


const rooms = [
  { roomID: 'R101', roomType: 'Deluxe', price: 150, status: 'Available' },
  { roomID: 'R102', roomType: 'Standard', price: 100, status: 'Available' },
  { roomID: 'R103', roomType: 'Suite', price: 200, status: 'Booked' },
];


const customers = [];

const CustomerRegistration = ({ onRegister }) => {
  const [customerID, setCustomerID] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (!customerName || !customerEmail || !customerPhone || !customerID) {
      setMessage('All fields are required!');
      return;
    }

  
    const newCustomer = {
      customerID,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      bookingHistory: [], 
    };
    customers.push(newCustomer);


    onRegister(newCustomer);

    setMessage('Customer Registered Successfully!');
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerID('');
  };

  return (
    <Container sx={{ padding: '90px', marginLeft: '-30px' , width:'600px'}}>
      <Paper sx={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          color: '#3f51b5',
          fontWeight: 'bold',
          marginBottom: '30px',
        }}>
          Customer Registration
        </Typography>

        <TextField
          label="Customer ID"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          sx={{ marginBottom: '15px', width: '100%' }}
        />
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          sx={{ marginBottom: '15px', width: '100%' }}
        />
        <TextField
          label="Customer Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          sx={{ marginBottom: '15px', width: '100%' }}
        />
        <TextField
          label="Customer Phone"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          sx={{ marginBottom: '20px', width: '100%' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ marginTop: '20px', width: '100%' , backgroundColor:'#f44886' }}
        >
          Register Customer
        </Button>

        {message && (
          <Typography sx={{ marginTop: '20px', textAlign: 'center', color: 'green' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

const BookingManagement = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerID, setCustomerID] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [customersList, setCustomersList] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleRoomBooking = () => {
    if (!selectedRoom || !customerID) {
      setMessage('Please select a room and customer!');
      return;
    }

    const customer = customersList.find((c) => c.customerID === customerID);
    console.log('Selected Customer:', customer);
    if (!customer) {
      setMessage('Customer not found!');
      return;
    }

    const room = rooms.find((r) => r.roomID === selectedRoom);
    if (!room) {
      setMessage('Room not found!');
      return;
    }

    const booking = {
      bookingID: `B${Math.random().toString(36).substr(2, 9)}`,
      customerID,
      roomID: selectedRoom,
      bookingDate,
      checkInDate,
      checkOutDate,
      status,
    };

    customer.bookingHistory.push(booking);
    setMessage(`Booking for ${customer.name} confirmed!`);
  };

  const handleCustomerSelection = (customer) => {
    setSelectedCustomer(customer);
    setCustomerID(customer.customerID);
    console.log('Selected Customer ID:', customer.customerID);
  };

  return (
    <Container sx={{ padding: '90px', marginLeft: '-30px' , width:'600px' }}>
      <Paper sx={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          color: '#3f51b5',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}>
          Room Booking Management
        </Typography>

        <Typography variant="h6">Select Customer</Typography>
        <FormControl sx={{ marginBottom: '20px', width: '100%' }}>
          <InputLabel>Select Customer</InputLabel>
          <Select
            value={selectedCustomer?.customerID || ''}
            onChange={(e) => handleCustomerSelection(customersList.find((c) => c.customerID === e.target.value))}
          >
            <MenuItem value="">Select Customer</MenuItem>
            {customersList.map((customer) => (
              <MenuItem key={customer.customerID} value={customer.customerID}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Room Selection */}
        <FormControl sx={{ marginBottom: '20px', width: '100%' }}>
          <InputLabel>Select Room</InputLabel>
          <Select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <MenuItem value="">Select Room</MenuItem>
            {rooms.map((room) => (
              <MenuItem key={room.roomID} value={room.roomID}>
                {room.roomType} - ${room.price} per night
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Booking Dates */}
        <TextField
          label="Booking Date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          sx={{ marginBottom: '15px', width: '100%' }}
        />
        <TextField
          label="Check-in Date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          sx={{ marginBottom: '15px', width: '100%' }}
        />
        <TextField
          label="Check-out Date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          sx={{ marginBottom: '20px', width: '100%' }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRoomBooking}
          sx={{ marginTop: '20px', width: '100%' , backgroundColor:'#f44886' }}
        >
          Book Room
        </Button>

        {message && (
          <Typography sx={{ marginTop: '20px', textAlign: 'center', color: 'green' }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  const handleCustomerRegistration = (customer) => {
    setCustomerData(customer);
    setIsRegistered(true);
  };

  return (
    <div>
      {!isRegistered ? (
        <CustomerRegistration onRegister={handleCustomerRegistration} />
      ) : (
        <BookingManagement />
      )}
    </div>
  );
};

export default App;
