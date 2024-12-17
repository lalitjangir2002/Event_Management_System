import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomizedInput from './shared/CustomizedInput';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationLink from './shared/NavigationLink';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    try {
      toast.loading('Signing In', { id: 'login' });
      await auth?.login(username, password);
      toast.success('Signed In Successfully', { id: 'login' });
      setTimeout(() => {
        toast.dismiss();
        navigate('/dashboard/');
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error('Signing In Failed', { id: 'login' });
      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate('/dashboard/');
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
          width: { xs: '100%', sm: '90%', md: '400px' },
          bgcolor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          padding={2}
          fontWeight={600}
          color="black"
        >
          Login
        </Typography>
        <CustomizedInput type="text" name="username" label="Username" />
        <CustomizedInput type="password" name="password" label="Password" />

        <Button
          type="submit"
          sx={{
            width: '30%',
            mt: 2,
            ml:17,
            py: 1,
            fontSize: '14px',
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
          Login
        </Button>

        <Box mt={4} display="flex" justifyContent="center">
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

export default Login;
