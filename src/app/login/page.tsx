
import { Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../_components/LoginForm/LoginForm';

export default function page() {



  return (
    <div>
      <Typography sx={{ textAlign: 'center', color: 'darkblue' }} component='h2' variant='h2'> Login Now</Typography>
      
    <LoginForm/>
    </div>
  )
}
