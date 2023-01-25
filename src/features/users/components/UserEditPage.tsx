import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography
} from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserById, patchUserById } from '../../../app/api'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { IUser, setStatus, loadStatusSelector } from '../usersSlice'

export const UserEditPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isLoad = useAppSelector(loadStatusSelector)

  const { userId } = useParams<{ userId: string }>()

  const { register, handleSubmit, control } = useForm<IUser>({
    defaultValues: async () => {
      try {
        const res = await getUserById(+userId!)
        return res.data.data
      } catch (error: any) {
        toast.error(error.message)
        return {} as IUser
      } finally {
        dispatch(setStatus(false))
      }
    }
  })

  const submitHandler: SubmitHandler<IUser> = async data => {
    dispatch(setStatus(true))
    try {
      const res = await patchUserById(data)

      if (res.status === 200) {
        toast.success('User was updated!')
        navigate(-1)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      dispatch(setStatus(false))
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h3" mb={2}>
        User id
      </Typography>
      <Backdrop open={isLoad} sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress size={60} color="inherit" />
      </Backdrop>
      <Paper
        component="form"
        onSubmit={handleSubmit(submitHandler)}
        elevation={8}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}
      >
        <FormControl>
          <Typography>Name</Typography>
          <OutlinedInput {...register('name')} />
        </FormControl>
        <FormControl>
          <Typography>Email</Typography>
          <OutlinedInput {...register('email')} />
        </FormControl>
        <Controller
          control={control}
          name="gender"
          render={({ field: { value, onChange } }) => (
            <FormControl>
              <Typography>Gender</Typography>
              <Select value={value || ''} onChange={onChange}>
                <MenuItem value="female">female</MenuItem>
                <MenuItem value="male">male</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { value, onChange } }) => (
            <FormControl>
              <Typography>Status</Typography>
              <Select value={value || ''} onChange={onChange}>
                <MenuItem value="inactive">inactive</MenuItem>
                <MenuItem value="active">active</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            back
          </Button>
          <Button type="submit" variant="contained">
            save
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
