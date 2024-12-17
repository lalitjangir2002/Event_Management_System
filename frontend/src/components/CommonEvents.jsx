import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllEvents } from '../helpers/api_communicator';
import { format } from "date-fns";
import NavigationLink from './shared/NavigationLink';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box 
} from '@mui/material';

const CommonEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      loadEvents();
  }, [navigate]);

  const loadEvents = async () => {
    try {
      const response = await getAllEvents();
      const events = response.map(event => ({
        ...event,
        date: new Date(event.date) // Assuming eventDate is the field with the timestamp
      }));
      console.log(events);
      setEvents(events);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom style={{color: 'black'}}>
        All Events
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "90%", margin: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>S.N</strong></TableCell>
              <TableCell align="center"><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>City</strong></TableCell>
              <TableCell align="center"><strong>Country</strong></TableCell>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{event.name}</TableCell>
                <TableCell align="center">{event.city}</TableCell>
                <TableCell align="center">{event.country}</TableCell>
                <TableCell align="center">{format(event.date, "MMMM do, yyyy")}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    to={{
                      pathname: "/viewCommonEvent",
                    }}
                    state={{ Event: event }}
                    sx={{ marginRight: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={{
                      pathname: "/registerAttendee",
                    }}
                    state={{ Event: event }}
                  >
                    Register
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box display="flex" justifyContent="center" mt={4}>
        <NavigationLink
          bg="white"
          to="/"
          text="Back To Home"
          textColor="black"
        />
      </Box>
    </Box>
  );
}

export default CommonEvents;
