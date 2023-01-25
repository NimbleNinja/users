import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { getUsers } from '../../app/api'
import { RootState } from '../../app/store'

const initialState: IUsersState = {
  list: [],
  isLoading: true,
  pagination: null,
  filter: ''
}

export interface IUser {
  email: string
  gender: 'male' | 'female'
  id: number
  name: string
  status: 'inactive' | 'active'
}

export interface IPagination {
  limit: number
  links: {
    current: string | null
    next: string | null
    previous: string | null
  }
  page: number
  pages: number
  total: number
}

export type TStatus = 'loading' | 'idle'
export interface IUsersState {
  list: IUser[]
  isLoading: boolean
  filter: '' | 'male' | 'female'
  pagination: IPagination | null
}

const USERS_GET = 'USERS_GET'

export const getUsersThunk = createAsyncThunk<
  AxiosResponse<{ data: IUser[]; meta: { pagination: IPagination } }>,
  string
>(USERS_GET, async (params: string) => {
  const res = await getUsers(params)
  return res
})

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.isLoading = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      const { data, meta } = action.payload.data

      state.isLoading = false
      state.list = data
      state.pagination = meta.pagination
    })
    builder.addCase(getUsersThunk.pending, state => {
      state.isLoading = true
    })
  }
})

export const usersSelector = (state: RootState) => state.users.list
export const filterSelector = (state: RootState) => state.users.filter
export const paginationSelector = (state: RootState) => state.users.pagination
export const loadStatusSelector = (state: RootState) => state.users.isLoading

export const { setStatus, setFilter } = usersReducer.actions

export default usersReducer.reducer
