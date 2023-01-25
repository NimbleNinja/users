import { Button, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const App = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Typography variant="h1" align="center">
        Users
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate('/users')}>
          go to users
        </Button>
      </Box>
    </Container>
  )
}
