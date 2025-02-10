import { TextField, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface CheckoutFormProps {
  onCheckout: (orderDetails: { name: string; email: string; phone: string; address: string }) => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCheckout }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onCheckout(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message?.toString() : ''}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Email is required', pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email address' } }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message?.toString() : ''}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: 'Phone is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' } }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message?.toString() : ''}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.address}
              helperText={errors.address ? errors.address.message?.toString() : ''}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Checkout
        </Button>
      </form>
    </Container>
  );
};

export default CheckoutForm;