import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button, Grid } from '@mui/material';
import './Popup.css';
import { getAttendees } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { format } from 'date-fns';

const ViewEvent = () => {
  const [attendees, setAttendees] = useState([]);
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const prevEvent = location?.state.Event;

  useEffect(() => {
    if (!auth?.user) {
      return navigate("*");
    } else {
      loadAttendees();
    }
  }, [auth, navigate]);

  const loadAttendees = async () => {
    try {
      const response = await getAttendees(`/attendees/${prevEvent.id}`);
      setAttendees(response);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={2}
      ml="auto"
      mt={8}
    >
      <Grid container spacing={4}>
        {/* Left side: Event details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: '#f9f9f9',
              borderRadius: 4,
              padding: 3,
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
              height: '92%',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              // padding={1}
              fontWeight={600}
              color="black"
            >
              Event Details
            </Typography>

            <CustomizedInput
              type="text"
              name="name"
              label="Name"
              value={prevEvent.name}
              readOnly
            />
            <CustomizedInput
              type="text"
              name="description"
              label="Description"
              value={prevEvent.description}
              readOnly
            />
            <CustomizedInput
              type="text"
              name="place"
              label="Place"
              value={prevEvent.place}
              readOnly
            />
            <CustomizedInput
              type="text"
              name="city"
              label="City"
              value={prevEvent.city}
              readOnly
            />
            <CustomizedInput
              type="text"
              name="country"
              label="Country"
              value={prevEvent.country}
              readOnly
            />
            <CustomizedInput
              type="date"
              name="date"
              label="Date"
              value={format(prevEvent.date, 'yyyy-MM-dd')}
              readOnly
            />

            <NavigationLink
              bg="#6D5147"
              to="/dashboard"
              text="Back"
              textColor="white"
              // mt={8}
              />
              </Box>
        </Grid>

        {/* Right side: Attendee list */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: '#f4f4f4',
              borderRadius: 4,
              padding: 3,
              height: '92%',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight={600}
              color="black"
              gutterBottom
            >
              Attendee List
            </Typography>
            <Box
              sx={{
                height: '400px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                padding: 2,
                borderRadius: 4,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {attendees.length > 0 ? (
                attendees.map((attendee, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: 2,
                      marginBottom: 2,
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <Typography variant="h6">{attendee.name}</Typography>
                    <Typography variant="body2">{attendee.email}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" textAlign="center">
                  No attendees yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewEvent;
