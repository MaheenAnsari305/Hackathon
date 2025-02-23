import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

// Customer Registration and Room Booking
const customers = [
  { customerID: 'C101', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', bookingHistory: [] },
  { customerID: 'C102', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', bookingHistory: [] },
];

const rooms = [
  { roomID: 'R101', roomType: 'Deluxe', price: 150, status: 'Available' },
  { roomID: 'R102', roomType: 'Standard', price: 100, status: 'Available' },
];

const BookingManagement = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [customerID, setCustomerID] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [customersList, setCustomersList] = useState(customers);
  const [message, setMessage] = useState('');

  const handleRoomBooking = () => {
    if (!selectedRoom || !customerID) {
      setMessage('Please select a room and customer!');
      return;
    }

    // Find the customer
    const customer = customersList.find((c) => c.customerID === customerID);
    if (!customer) {
      setMessage('Customer not found!');
      return;
    }

    // Find the room
    const room = rooms.find((r) => r.roomID === selectedRoom);
    if (!room) {
      setMessage('Room not found!');
      return;
    }

    // Create a new booking object
    const booking = {
      bookingID: `B${Math.random().toString(36).substr(2, 9)}`, // Generate unique bookingID
      customerID,
      roomID: selectedRoom,
      bookingDate,
      checkInDate,
      checkOutDate,
      status,
    };

    // Update the customer's booking history
    customer.bookingHistory.push(booking);

    // Display confirmation message
    setMessage(`Booking for ${customer.name} confirmed!`);

    // Reset form after booking
    setSelectedRoom(null);
    setCustomerID('');
    setBookingDate('');
    setCheckInDate('');
    setCheckOutDate('');
  };

  return (
    <Box sx={{ padding: '20px',marginTop: '60px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Room Booking Management
      </Typography>

      {/* Customer and Room Selection */}
      <TextField
        label="Customer ID"
        value={customerID}
        onChange={(e) => setCustomerID(e.target.value)}
        sx={{ marginBottom: '20px', width: '100%' }}
      />
      <TextField
        label="Booking Date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        sx={{ marginBottom: '20px', width: '100%' }}
      />
      <TextField
        label="Check-in Date"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        sx={{ marginBottom: '20px', width: '100%' }}
      />
      <TextField
        label="Check-out Date"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        sx={{ marginBottom: '20px', width: '100%' }}
      />

      <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom} style={{ width: '100%', padding: '10px' }}>
        <option value="">Select Room</option>
        {rooms.map((room) => (
          <option key={room.roomID} value={room.roomID}>
            {room.roomType} - ${room.price} per night
          </option>
        ))}
      </select>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRoomBooking}
        sx={{ marginTop: '20px', width: '100%' }}
      >
        Book Room
      </Button>

      {/* Show confirmation message */}
      {message && (
        <Typography sx={{ marginTop: '20px', textAlign: 'center', color: 'green' }}>
          {message}
        </Typography>
      )}

      {/* Display customer's booking history */}
      {customerID && (
        <Box sx={{ marginTop: '40px' }}>
          <Typography variant="h6">Booking History for Customer ID: {customerID}</Typography>
          <ul>
            {customersList
              .find((customer) => customer.customerID === customerID)
              ?.bookingHistory.map((booking, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    Room: {rooms.find((r) => r.roomID === booking.roomID)?.roomType} | Status: {booking.status} | Dates: {booking.checkInDate} to {booking.checkOutDate}
                  </Typography>
                </li>
              ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default BookingManagement;
