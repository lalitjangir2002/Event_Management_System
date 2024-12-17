import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomizedInput from './shared/CustomizedInput';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationLink from './shared/NavigationLink';

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const name = data.get('name');
    const username = data.get('username');

    try {
      toast.loading('Signing Up', { id: 'signup' });
      await auth?.signup(name, username, email, password);
      toast.success('Signed up Successfully', { id: 'signup' });
      setTimeout(() => {
        toast.dismiss();
        navigate('/dashboard/');
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error('Signup Failed', { id: 'signup' });
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      toast.success('Redirecting to dashboard...');
      return navigate('/dashboard');
    }
  }, [auth, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      padding={2}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '90%', sm: '70%', md: '400px' },
          bgcolor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          // padding={2}
          fontWeight={600}
          color="black"
        >
          Signup
        </Typography>
        <CustomizedInput type="text" name="name" label="Name" />
        <CustomizedInput type="text" name="username" label="Username" />
        <CustomizedInput type="email" name="email" label="Email" />
        <CustomizedInput type="password" name="password" label="Password" />

        <Button
          type="submit"
          sx={{
            width: '100%',
            mt: 2,
            py: 1.5,
            fontSize: '18px',
            fontWeight: 600,
            borderRadius: 2,
            border:0,
            bgcolor: 'black',
            color: 'white',
            transition: '0.3s',
            ':hover': {
              bgcolor: 'white',
              color: 'black',
              border: '1px solid black',
            },
          }}
        >
          Signup
        </Button>

        <Box mt={2} display="flex" justifyContent="center">
          <NavigationLink
            bg="black"
            to="/"
            text="Back To Home"
            textColor="white"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
