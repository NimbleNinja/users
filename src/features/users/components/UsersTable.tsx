import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  getUsersThunk,
  paginationSelector,
  loadStatusSelector,
  usersSelector,
  filterSelector,
  setFilter,
  setStatus
} from '../usersSlice'

export const UsersTable = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const users = useAppSelector(usersSelector)
  const pagination = useAppSelector(paginationSelector)
  const isLoad = useAppSelector(loadStatusSelector)
  const filter = useAppSelector(filterSelector)

  useEffect(() => {
    dispatch(getUsersThunk('?page=1&per_page=20'))
  }, [dispatch])

  const rowHandler = useCallback(
    (id: number) => {
      dispatch(setStatus(true))
      navigate(`edit/${id}`)
    },
    [dispatch, navigate]
  )

  const paginationHandler = useCallback(
    (pageNumber: number) => {
      if (!pagination) return

      dispatch(getUsersThunk(`?page=${pageNumber}&per_page=20`))
    },
    [dispatch, pagination]
  )

  const filteredUsers = useMemo(() => {
    return filter ? users.filter(({ gender }) => gender === filter) : users
  }, [filter, users])

  return (
    <Container>
      <Backdrop open={isLoad} sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
        <CircularProgress size={60} color="inherit" />
      </Backdrop>
      <TableContainer>
        <Button variant="outlined" onClick={() => navigate('/home')}>
          home
        </Button>
        <Typography align="center" variant="h3">
          Users
        </Typography>
        <TextField
          size="small"
          sx={{ minWidth: '100px', mb: 1 }}
          label="filter"
          select
          value={filter}
          onChange={e => dispatch(setFilter(e.target.value))}
        >
          <MenuItem value="">all</MenuItem>
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </TextField>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 700 } }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map(({ id, name, email, gender, status }) => (
              <TableRow key={id} onClick={() => rowHandler(id)}>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{gender}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {pagination && (
            <Pagination
              sx={{ mt: 2 }}
              color="primary"
              variant="outlined"
              onChange={(e, page) => paginationHandler(page)}
              count={pagination.pages}
              page={pagination.page}
              hidePrevButton={!pagination.links.previous}
              hideNextButton={!pagination.links.next}
            />
          )}
        </Box>
      </TableContainer>
    </Container>
  )
}
