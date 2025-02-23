import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';


const services = [
  {
    serviceID: 'S001',
    serviceType: 'Room Service',
    description: 'Order food and beverages to your room.',
    price: 20.00,
  },
  {
    serviceID: 'S002',
    serviceType: 'Laundry',
    description: 'Wash and iron your clothes during your stay.',
    price: 15.00,
  },
  {
    serviceID: 'S003',
    serviceType: 'Spa',
    description: 'Relax and rejuvenate with a soothing spa treatment.',
    price: 50.00,
  },
  {
    serviceID: 'S004',
    serviceType: 'Airport Shuttle',
    description: 'Transportation to and from the airport.',
    price: 30.00,
  },
  {
    serviceID: 'S005',
    serviceType: 'Room Cleaning',
    description: 'Daily cleaning service for your room.',
    price: 10.00,
  },
  {
    serviceID: 'S006',
    serviceType: 'Massage',
    description: 'Relaxing massage services to unwind.',
    price: 40.00,
  },
  {
    serviceID: 'S007',
    serviceType: 'Tour Guide',
    description: 'Explore local attractions with an expert guide.',
    price: 25.00,
  },
  {
    serviceID: 'S008',
    serviceType: 'Fitness Center',
    description: 'Access to the hotel’s gym and fitness facilities.',
    price: 15.00,
  },
  {
    serviceID: 'S009',
    serviceType: 'Valet Parking',
    description: 'Convenient valet parking service.',
    price: 10.00,
  },
  {
    serviceID: 'S010',
    serviceType: 'Wi-Fi',
    description: 'High-speed internet access throughout the hotel.',
    price: 5.00,
  },
];


const ServiceCard = ({ service }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Service ID: {service.serviceID}</Typography>
          <Typography variant="body1"><strong>Service Type:</strong> {service.serviceType}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {service.description}</Typography>
          <Typography variant="body1"><strong>Price:</strong> ${service.price}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const ServiceManagement = () => {
  return (
    <div style={{ padding: '20px', marginTop: '70px', marginLeft: '-20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Hotel Services Management
      </Typography>

      
      <Grid container spacing={2}>
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </Grid>
    </div>
  );
};

export default ServiceManagement;
