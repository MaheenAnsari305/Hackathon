import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const payments = [
  {
    paymentID: 'P12345',
    bookingID: 'B67890',
    amount: 120.50,
    paymentDate: '2025-02-22T15:30:00',
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    paymentID: 'P54321',
    bookingID: 'B09876',
    amount: 150.75,
    paymentDate: '2025-02-21T10:00:00',
    paymentMethod: 'PayPal',
    status: 'Pending',
  },
  {
    paymentID: 'P67890',
    bookingID: 'B11223',
    amount: 250.00,
    paymentDate: '2025-02-20T14:00:00',
    paymentMethod: 'Debit Card',
    status: 'Completed',
  },
  {
    paymentID: 'P98765',
    bookingID: 'B33445',
    amount: 180.60,
    paymentDate: '2025-02-19T16:30:00',
    paymentMethod: 'Bank Transfer',
    status: 'Failed',
  },
  {
    paymentID: 'P11223',
    bookingID: 'B55667',
    amount: 300.45,
    paymentDate: '2025-02-18T12:00:00',
    paymentMethod: 'Credit Card',
    status: 'Completed',
  },
  {
    paymentID: 'P22334',
    bookingID: 'B77889',
    amount: 98.99,
    paymentDate: '2025-02-17T09:30:00',
    paymentMethod: 'PayPal',
    status: 'Pending',
  },
  {
    paymentID: 'P33445',
    bookingID: 'B99001',
    amount: 450.00,
    paymentDate: '2025-02-16T11:00:00',
    paymentMethod: 'Debit Card',
    status: 'Completed',
  },
  {
    paymentID: 'P44556',
    bookingID: 'B22334',
    amount: 350.80,
    paymentDate: '2025-02-15T13:15:00',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
  },
  {
    paymentID: 'P55667',
    bookingID: 'B44556',
    amount: 99.90,
    paymentDate: '2025-02-14T10:45:00',
    paymentMethod: 'Credit Card',
    status: 'Failed',
  },
  {
    paymentID: 'P66778',
    bookingID: 'B66778',
    amount: 275.00,
    paymentDate: '2025-02-13T08:30:00',
    paymentMethod: 'PayPal',
    status: 'Completed',
  },
];

const PaymentCard = ({ payment }) => {
  return (
    <Grid item xs={12} sm={6} md={5}>
      <Card sx={{ boxShadow: 5, marginBottom: '20px', marginLeft: '1px', marginRight: '15px'  }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Payment ID: {payment.paymentID}</Typography>
          <Typography variant="body1"><strong>Booking ID:</strong> {payment.bookingID}</Typography>
          <Typography variant="body1"><strong>Amount:</strong> ${payment.amount}</Typography>
          <Typography variant="body1"><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleString()}</Typography>
          <Typography variant="body1"><strong>Payment Method:</strong> {payment.paymentMethod}</Typography>
          <Typography variant="body1"><strong>Status:</strong> {payment.status}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const PaymentManagement = () => {
  return (
    <div style={{ padding: '20px', marginTop: '70px', marginLeft: '-20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Payment Management
      </Typography>

      
      <Grid container spacing={2}>
        {payments.map((payment, index) => (
          <PaymentCard key={index} payment={payment} />
        ))}
      </Grid>
    </div>
  );
};

export default PaymentManagement;
