import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomizedInput from './shared/CustomizedInput';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { addAttendee } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';

const AttendeeRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevEvent = location?.state?.Event;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name');
    const email = data.get('email');

    try {
      toast.loading('Registering...');
      const response = await addAttendee(prevEvent.id, name, email);
      console.log(response);

      toast.success('Registered Successfully');
      setTimeout(() => {
        toast.dismiss();
      }, 3000);

      navigate('/allEvents');
    } catch (error) {
      console.log(error);
      toast.error('Failed to register');
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }

    console.log(`${name} and ${email}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      sx={{
        minHeight: '100vh',
        bgcolor: '#f0f2f5', // A soft background for contrast
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '500px',
          bgcolor: 'white',
          padding: 4,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          paddingBottom={3}
          fontWeight={700}
          color="primary"
        >
          Register for Event
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          <CustomizedInput type="text" name="name" label="Name" />
          <CustomizedInput type="email" name="email" label="Email" />

          <Box
            display="flex"
            justifyContent="space-between" // Buttons side by side
            gap={2} // Ensures spacing between buttons
            mt={3}
          >
            <Button
              type="submit"
              sx={{
                flex: 1, // Buttons will take equal space
                py: 1.5,
                borderRadius: 2,
                bgcolor: 'black',
                color: 'white',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.3s ease',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                },
              }}
            >
              Register
            </Button>

            <NavigationLink
              bg="black"
              to="/"
              text="Back To Home"
              textColor="white"
              sx={{
                flex: 1,
                pt: 1.5,
                textAlign: 'center',
                borderRadius: 2,
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-block',
                transition: 'all 0.3s ease',
                bgcolor: 'black',
                color: 'white',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AttendeeRegister;
