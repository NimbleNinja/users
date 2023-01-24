import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: () => {}
})

export const {} = usersReducer.actions

export default usersReducer.reducer
