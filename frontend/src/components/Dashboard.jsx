import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAuthToken, request } from '../helpers/axios_helper';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { getEvents } from '../helpers/api_communicator';
import NavigationLink from './shared/NavigationLink';
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (!auth?.user) {
      return navigate("*");
    } else {
      loadEvents();
    }
  }, [auth, navigate]);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      const events = response.map(event => ({
        ...event,
        date: new Date(event.date) // Formatting date
      }));
      setEvents(events);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const onDelete = async (id) => {
    await request("DELETE", `/delete/${id}`, {});
    loadEvents();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="600" mb={4} color="black">
        Dashboard
      </Typography>
      <NavigationLink
        bg="black"
        to="/addEvent"
        text="Add New Event"
        textColor="white"
      />
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.city}</TableCell>
                <TableCell>{event.country}</TableCell>
                <TableCell>{format(event.date, "MMMM do, yyyy")}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={{ pathname: "/viewEvent" }}
                    state={{ Event: event }}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={{ pathname: "/editEvent" }}
                    state={{ Event: event }}
                    color="secondary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(event.id)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
