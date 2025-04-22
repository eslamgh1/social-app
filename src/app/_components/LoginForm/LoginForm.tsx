'use client';

import { VisibilityOff, Visibility, Password, LineAxisOutlined } from '@mui/icons-material'
import { Box, Button, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik';
import { FormValueType } from './LoginForm.types'
import axios from "axios";
import { useRouter } from 'next/navigation'
import { clearUserData, setUserToken } from '_/lib/redux/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie'



type LoginFromResponseType = { message: string, token: string };

export default function LoginForm() {

  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter()

  const formikData: FormValueType = {
    email: '',
    password: '',
  }

  function handleSubmit(values: FormValueType) {
    console.log(values, "Values from Formik");

    axios.post<LoginFromResponseType>('https://linked-posts.routemisr.com/users/signin', values)
      .then(
        res => {
          console.log('Token from handleSubmit-login', res.data.token);
          // localStorage.setItem('userToken',res.data.token);
          Cookies.set('userToken', res.data.token)

          // imported from authSlice
          dispatch(setUserToken(res.data.token))

          router.push('/profile')
        }
      )
      .catch(
        err => {
          console.log('err from handleSubmit-login', err)
        }
      )
  }

  const formikObj = useFormik({
    initialValues: formikData,
    onSubmit: handleSubmit,
  });



  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <Box
      onSubmit={formikObj.handleSubmit}
      sx={{
        width: '50%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column', // Ensures vertical stacking
        gap: '15px', // Adds spacing between children
      }}
      component="form"
    >
      {/* Email Field */}
      <TextField
        fullWidth // Takes full width (no need for sx width)
        label="Email"
        variant="outlined"
        id='email'
        value={formikObj.values.email}
        onChange={formikObj.handleChange}
      />

      {/* Password Field */}
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        value={formikObj.values.password}
        onChange={formikObj.handleChange}
        fullWidth
        id="password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      {/* Submit Button */}
      <Button type='submit' variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  )
}
