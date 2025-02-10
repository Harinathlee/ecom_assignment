import React from "react";
import { Input, FormControl, FormHelperText, Button, Typography, Box } from "@mui/material";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getUserDetails } from "../utilities/UserUtils";

// Define the props for CheckoutForm component
interface CheckoutFormProps {
  onCheckout: (orderDetails: { name: string; email: string; phone: string; address: string; }) => void;
}

// Define the form values interface
interface FormValues {
  address: string;
}

// CheckoutForm component
const CheckoutForm: React.FC<CheckoutFormProps> = ({ onCheckout }) => {
  // Access the theme state from the Redux store
  const theme = useSelector((state: unknown) => state as RootState).theme;

  // Get user details (e.g., name, email, phone) from utility function
  const user = getUserDetails();

  // Initialize useForm with default values and validation
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: { address: "" },
  });

  // Define the form submission handler
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onCheckout({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: data.address,
    });
  };

  return (
    // Container for the checkout form with dynamic styling based on the theme
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      sx={{ padding: '16px', width: '100%' }}
    >
      <Box 
        sx={{ 
          maxWidth: '400px', 
          width: '100%', 
          borderRadius: '8px', 
          boxShadow: theme.theme === "dark" ? "0 4px 20px rgba(0, 0, 0, 0.5)" : "0 4px 20px rgba(0, 0, 0, 0.1)", 
          backgroundColor: theme.theme === "dark" ? "#333" : "#fff", 
          color: theme.theme === "dark" ? "#fff" : "#000", 
          padding: '16px' 
        }}
      >
        {/* Header for the checkout form */}
        <Typography variant="h4" gutterBottom textAlign="center">
          Checkout Form
        </Typography>
        {/* Form for capturing address */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Display user details */}
          <Typography variant="h6" gutterBottom>
            Name: {user.name ?? ""}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {user.email ?? ""}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Phone: {user.phone ?? ""}
          </Typography>
          {/* Controlled input field for address */}
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <FormControl fullWidth>
                <Input
                  {...field}
                  type="text"
                  placeholder="Address"
                  error={!!errors.address}
                  sx={{
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: theme.theme === "dark" ? "#444" : "#fff",
                    color: theme.theme === "dark" ? "#fff" : "#333",
                  }}
                />
                <FormHelperText error={!!errors.address}>
                  {errors.address ? errors.address.message?.toString() : ""}
                </FormHelperText>
              </FormControl>
            )}
          />
          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: theme.theme === "dark" ? "#1976d2" : "#3f51b5",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "5px",
              '&:hover': {
                backgroundColor: theme.theme === "dark" ? "#115293" : "#303f9f",
              },
            }}
          >
            Checkout
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CheckoutForm;