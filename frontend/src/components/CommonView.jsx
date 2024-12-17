import React from 'react';
import { useLocation } from 'react-router-dom';
import CustomizedInput from './shared/CustomizedInput';
import { Box, Typography, Button } from '@mui/material';
import { format } from 'date-fns';
import NavigationLink from './shared/NavigationLink';

const CommonViewEvent = () => {
  const location = useLocation();
  const prevEvent = location?.state?.Event;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      padding={4}
      gap={6}
      maxWidth="900px"
      marginTop={6}
      marginLeft={35}
    >
      <Box
        width="100%"
        maxWidth={{ xs: '100%', md: '50%' }}
        boxShadow={3}
        padding={4}
        bgcolor="white"
        borderRadius={2}
      >
        <Typography
          variant="h4"
          textAlign="center"
          // paddingBottom={2}
          fontWeight={700}
          color="primary"
        >
          Event Details
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} paddingLeft={3}>
          <CustomizedInput type="name" name="name" label="Name" value={prevEvent?.name} />
          <CustomizedInput type="description" name="description" label="Description" value={prevEvent?.description} />
          <CustomizedInput type="place" name="place" label="Place" value={prevEvent?.place} />
          <CustomizedInput type="city" name="city" label="City" value={prevEvent?.city} />
          <CustomizedInput type="country" name="country" label="Country" value={prevEvent?.country} />
          <CustomizedInput type="date" name="date" label="Date" value={format(new Date(prevEvent?.date), 'yyyy-MM-dd')} />
        </Box>

        <Box display="flex" justifyContent="center" marginTop={4}>
          <NavigationLink
            bg="black"
            to="/allEvents"
            text="BACK"
            textColor="white"
            padding="10px 20px"
            borderRadius="5px"
            boxShadow="2px 2px 6px rgba(0, 0, 0, 0.2)"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CommonViewEvent;
