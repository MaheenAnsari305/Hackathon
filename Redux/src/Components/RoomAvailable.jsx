import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';


const rooms = [
  { roomNumber: '101', roomType: 'Suite', price: 200, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRF0rCJDJAYq7WVc5pVQsnHiQAPGTPXeV-Vg&s' },
  { roomNumber: '102', roomType: 'Single', price: 150, status: 'Occupied', image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=' },
  { roomNumber: '103', roomType: 'Single', price: 100, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFCwva-y6qajWSilOux4w6EJOO2nEAY46loQ&s' },
  { roomNumber: '104', roomType: 'Suite', price: 250, status: 'Available', image: 'https://2.imimg.com/data2/SI/TS/MY-3125576/lemon_tree_hotel_single-room-500x500.jpg' },
  { roomNumber: '105', roomType: 'Double', price: 180, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMKzonrXOUCtFwrLG-SO3NzYrQS1Sz-Ak8w&s' },
  { roomNumber: '106', roomType: 'Single', price: 120, status: 'Occupied', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOt3cJqVp3o2o89IYPXKQCghZqNwo-jSnIg&s' },
  { roomNumber: '107', roomType: 'Double', price: 170, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQemicuavapU5EeK92Ntv65RAPzSI6t0B5OWA&s' },
  { roomNumber: '108', roomType: 'Suite', price: 300, status: 'Occupied', image: 'https://static.vecteezy.com/system/resources/thumbnails/044/153/869/small_2x/beautiful-interior-view-of-a-room-at-coastal-free-photo.jpg' },
  { roomNumber: '109', roomType: 'Single', price: 130, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58fRlzU8L5TuYzX5W01faI732hiFRBkUDeA&s' },
  { roomNumber: '110', roomType: 'Suite', price: 400, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGXdtNNuBvSTX7Sr4MNU0bsopyCKb0NgVkA&s' },
  { roomNumber: '111', roomType: 'Double', price: 160, status: 'Occupied', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFhGQd1lnDokX8rl_VXEgALX9nBDre-dQVrQ&s' },
  { roomNumber: '112', roomType: 'Single', price: 110, status: 'Available', image: 'https://watermark.lovepik.com/photo/20211120/large/lovepik-hotel-room-picture_500530786.jpg' },
  { roomNumber: '113', roomType: 'Double', price: 190, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmT0SdqjxIiDws_F9LWUfVPwZGCVWelUY0_Q&s' },
  { roomNumber: '114', roomType: 'Suite', price: 350, status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInjruXd50e656cqQfT0YMV7XTjtrmn5fJbw&s' },
  { roomNumber: '115', roomType: 'Single', price: 140, status: 'Occupied', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6y-biBVMMN6Fw-SQKGrueD9LrKcnGC6uunA&s' },
  
];


const customers = [
  { customerID: 'C123', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', bookingHistory: [] },
  
];

const RoomAvailable = () => {
  const [roomsData, setRoomsData] = useState(rooms);
  const [customersData, setCustomersData] = useState(customers);


  const handleBooking = (roomNumber) => {
    const loggedInCustomerID = 'C123'; 
    const customer = customersData.find((customer) => customer.customerID === loggedInCustomerID);

    if (customer) {
      const room = roomsData.find((room) => room.roomNumber === roomNumber);

      if (room && room.status === 'Available') {
       
        const updatedRooms = roomsData.map((r) =>
          r.roomNumber === roomNumber ? { ...r, status: 'Occupied' } : r
        );
        setRoomsData(updatedRooms);

        
        const newBooking = {
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          price: room.price,
          dateBooked: new Date().toLocaleString(),
        };
        const updatedCustomer = { ...customer, bookingHistory: [...customer.bookingHistory, newBooking] };
        const updatedCustomers = customersData.map((c) =>
          c.customerID === loggedInCustomerID ? updatedCustomer : c
        );
        setCustomersData(updatedCustomers);

        alert(`Room ${roomNumber} has been successfully booked!`);
      } else {
        alert('This room is not available for booking.');
      }
    } else {
      alert('Customer not found!');
    }
  };

  return (
    <div style={{ padding: '10px', marginTop: '70px', marginLeft: '-200px' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Available Rooms
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {roomsData.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={room.image}
                alt={`Room ${room.roomNumber}`}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  Room {room.roomNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {room.roomType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${room.price} per night
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                  Status: <span style={{ color: room.status === 'Available' ? 'green' : 'red' }}>{room.status}</span>
                </Typography>
                {room.status === 'Available' && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '15px' }}
                    fullWidth
                    onClick={() => handleBooking(room.roomNumber)}
                  >
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomAvailable;
