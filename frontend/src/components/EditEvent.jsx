import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material';
import './Popup.css';
import { updateEvent } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { format } from 'date-fns';

const EditEvent = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate('*');
    }
  }, [auth, navigate]);

  const [prevEvent, setPrevEvent] = useState(location?.state.Event);

  const onInputChange = (e) => {
    setPrevEvent({ ...prevEvent, [e.target.name]: e.target.value });
  };

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
      const response = await updateEvent(
        `/update/${prevEvent.id}`,
        name,
        username,
        description,
        place,
        city,
        country,
        date
      );
      console.log(response);
      toast.success('Event Updated Successfully!');
      navigate("/dashboard")
    } catch (error) {
      console.log(error);
      toast.error("Event couldn't be updated.");
    }
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight="100vh" 
      padding={4}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '450px', 
            padding: '24px',
            backgroundColor: '#F4F1EE',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            padding={1}
            fontWeight={600}
            color={'#6D5147'}
          >
            Edit Event
          </Typography>

          <CustomizedInput
            type="text"
            name="name"
            label="Name"
            value={prevEvent.name}
            onChange={onInputChange}
            sx={{ mb: 2, width: '100%' }}
          />
          <CustomizedInput
            type="text"
            name="description"
            label="Description"
            value={prevEvent.description}
            onChange={onInputChange}
            sx={{ mb: 2, width: '100%' }}
          />
          <CustomizedInput
            type="text"
            name="place"
            label="Place"
            value={prevEvent.place}
            onChange={onInputChange}
            sx={{ mb: 2, width: '100%' }}
          />
            <CustomizedInput
              type="text"
              name="city"
              label="City"
              value={prevEvent.city}
              onChange={onInputChange}
              sx={{ mb: 2, width: '48%' }}
            />
            <CustomizedInput
              type="text"
              name="country"
              label="Country"
              value={prevEvent.country}
              onChange={onInputChange}
              sx={{ mb: 2, width: '48%' }}
            />
          <CustomizedInput
            type="date"
            name="date"
            label="Date"
            value={format(new Date(prevEvent.date), 'yyyy-MM-dd')}
            onChange={onInputChange}
            sx={{ mb: 2, width: '100%' }}
          />

          {/* Buttons in one row */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                width: '48%',
                borderRadius: 2,
                backgroundColor: '#6D5147',
                color: 'white',
                ':hover': {
                  backgroundColor: '#8C7066',
                },
              }}
            >
              Update
            </Button>

            <NavigationLink
              bg="#AE9D99"
              to="/dashboard"
              text="Back"
              textColor="white"
              sx={{
                textAlign: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                width: '48%',
                ':hover': {
                  backgroundColor: '#8C7066',
                },
              }}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default EditEvent;
