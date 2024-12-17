import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material';
import './Popup.css';
import { addEvent } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';

const AddEvent = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      return navigate('*');
    }
  }, [auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = data.get('name');
    const description = data.get('description');
    const place = data.get('place');
    const city = data.get('city');
    const country = data.get('country');
    const date = data.get('date');
    const username = auth.user.username;

    try {
      const response = await addEvent(
        name,
        username,
        description,
        place,
        city,
        country,
        date
      );
      console.log(response);
      toast.success('Event Added Successfully', { duration: 3000 });
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
      toast.error("Event couldn't be added", { duration: 3000 });
    }

    console.log(username + ' and ' + name);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={2}
      ml="auto"
      mt={8}
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            background: 'white',
            borderRadius: 4,
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            padding: 3,
            width: { xs: '100%', sm: '400px' },
          }}
        >
          <Typography
            variant="h4" 
            textAlign="center"
            fontWeight={700}
            color="primary"
            mb={1}
          >
            Add New Event
          </Typography>

          <Box display="flex" flexDirection="column" gap={1}>
            <CustomizedInput
              type="name"
              name="name"
              label="Event Name"
              sx={{ mb: 1 }}
            />
            <CustomizedInput
              type="description"
              name="description"
              label="Description"
              sx={{ mb: 2}}
            />
            <CustomizedInput
              type="place"
              name="place"
              label="Place"
              sx={{ mb: 2 }}
            />
            <CustomizedInput
              type="city"
              name="city"
              label="City"
              sx={{ mb: 2 }}
            />
            <CustomizedInput
              type="country"
              name="country"
              label="Country"
              sx={{ mb: 2 }}
            />
            <CustomizedInput
              type="date"
              name="date"
              label="Event Date"
              sx={{ mb: 2 }}
            />

            {/* Buttons: Add Event and Back, with consistent styling */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                type="submit"
                sx={{
                  px: 3,
                  py: 1,
                  width: '45%',
                  borderRadius: 2,
                  bgcolor: 'black',
                  color: 'white',
                  fontWeight: 600,
                  transition: 'background 0.3s, transform 0.3s',
                  ':hover': {
                    bgcolor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Add Event
              </Button>

              <NavigationLink
                to="/dashboard"
                text="Back"
                textColor="white"
                bg="black"
                width="45%"
                sx={{
                  textAlign: 'center',
                  ':hover': {
                    backgroundColor: '#555',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddEvent;
