import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Container,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Edit, Save, X } from "lucide-react";
import { getUserDetails, setUserState } from "../utilities/UserUtils";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Define the form values interface
interface ProfileForm {
  name: string;
  email: string;
  phone: string;
}

// ProfilePage component
const ProfilePage = () => {
  // Initialize the react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();

  // State to track edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Get user details from utility function
  const userState = getUserDetails();
  
  // Access the theme state from the Redux store
  const theme = useSelector((state: unknown) => state as RootState).theme;

  // Update local storage whenever userState changes
  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(userState));
  }, [userState]);

  // Define the form submission handler
  const onSubmit = async (data: ProfileForm) => {
    // Update user state with new profile information
    setUserState(data);
    setIsEditMode(false);
  };

  return (
    // Container for the profile page with dynamic styling based on the theme
    <Container
      maxWidth="xl"
      className={`h-screen p-20 flex justify-center items-center ${
        theme.theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`w-1/2 p-10 rounded-lg shadow-lg shadow-slate-600 bg-slate-300`}
      >
        <div className={`flex flex-col gap-10px`}>
          {isEditMode ? (
            // Form for editing profile details
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`flex flex-col gap-15px`}
            >
              <Typography variant="h5" gutterBottom>
                Profile Details
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue={userState.name}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue={userState.email}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue={userState.phone}
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message:
                        "Invalid Indian mobile number. Please enter a 10-digit number.",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      error={!!errors.phone}
                      helperText={errors.phone ? errors.phone.message : ""}
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  startIcon={<Save />}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditMode(false)}
                  startIcon={<X />}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          ) : (
            // Display user profile details
            <div>
              <Typography
                variant="h5"
                gutterBottom
                className="text-center underline"
              >
                Profile Details
              </Typography>
              <Stack spacing={2}>
                <Typography variant="body1">
                  <strong>Name:</strong> {userState.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {userState.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone Number:</strong> {userState.phone}
                </Typography>
              </Stack>
              <Button
                onClick={() => setIsEditMode(true)}
                startIcon={<Edit />}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
