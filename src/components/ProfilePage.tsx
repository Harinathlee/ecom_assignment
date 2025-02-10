import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Typography, Container } from '@mui/material';
import { Edit, Save, X } from 'lucide-react';

interface ProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
}

interface UserState {
  name: string;
  email: string;
  phoneNumber: string;
}

const ProfilePage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ProfileForm>();
  const [userState, setUserState] = useState<UserState>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '9876543210',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const onSubmit = async (data: ProfileForm) => {
    // Update user state with new profile information
    setUserState(data);
    setIsEditMode(false);
  };

  return (
    <Container maxWidth="sm" style={{ padding: '20px' }}>
      {isEditMode ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Controller
            name="name"
            control={control}
            defaultValue={userState.name}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={userState.email}
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue={userState.phoneNumber}
            rules={{
              required: 'Phone Number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Invalid Indian mobile number. Please enter a 10-digit number.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
              />
            )}
          />
          <div>
            <Button type="submit" startIcon={<Save />} variant="contained" color="primary" style={{ marginRight: '10px' }}>
              Save
            </Button>
            <Button onClick={() => setIsEditMode(false)} startIcon={<X />} variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            Profile Details
          </Typography>
          <Typography variant="body1"><strong>Name:</strong> {userState.name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {userState.email}</Typography>
          <Typography variant="body1"><strong>Phone Number:</strong> {userState.phoneNumber}</Typography>
          <Button onClick={() => setIsEditMode(true)} startIcon={<Edit />} variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Edit
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ProfilePage;