import React from 'react';
import { Input, FormControl, FormHelperText, Button, Typography } from '@mui/material';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getUserDetails } from '../utilities/UserUtils';

interface CheckoutFormProps {
  onCheckout: (orderDetails: { name: string; email: string; phone: string; address: string }) => void;
}

interface FormValues {
  address: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCheckout }) => {
  const theme = useSelector((state: unknown) => state as RootState).theme;
  const user = getUserDetails();
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      address: '',
    },
  });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onCheckout({ name: user.name ?? '', email: user.email ?? '', phone: user.phone ?? '', address: data.address });
  };
  return (
    <div
      className={`max-w-md mx-auto p-4  w-1/2 rounded-lg shadow-lg  ${
        theme.theme === 'dark'
          ? 'bg-gray-800 text-gray-100 shadow-slate-900'
          : 'bg-white text-gray-900 shadow-slate-500'
      }`}
    >
      <Typography
        variant="h4"
        gutterBottom
        className={`text-center font-bold ${
          theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        Checkout Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Typography
          variant="h6"
          gutterBottom
          className={`${
            theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Name: {user.name ?? ''}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          className={`${
            theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Email: {user.email ?? ''}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          className={`${
            theme.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Phone: {user.phone ?? ''}
        </Typography>
        <Controller
          name="address"
          control={control}
          rules={{ required: 'Address is required' }}
          render={({ field }) => (
            <FormControl fullWidth>
              <Input
                {...field}
                type="text"
                placeholder="Address"
                error={!!errors.address}
                sx={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  backgroundColor: theme.theme === 'dark' ? '#333' : '#fff',
                  color: theme.theme === 'dark' ? '#fff' : '#333',
                }}
              />
              <FormHelperText error={!!errors.address}>{errors.address ? errors.address.message?.toString() : ''}</FormHelperText>
            </FormControl>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={`bg-blue-500 ${
            theme.theme === 'dark' ? 'dark:bg-blue-700' : ''
          } text-white font-bold py-2 px-4 rounded-md`}
        >
          Checkout
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;