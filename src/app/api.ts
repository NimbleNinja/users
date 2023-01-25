import axios, { AxiosResponse } from 'axios'
import { IUser } from '../features/users/usersSlice'

export const BASE_URL = 'https://gorest.co.in/public/v1/users'

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: 'Bearer 814ace3b8a1d4b3f6e84f2c233041914203744804167a043ce1c2b1306f9f1a8'
  }
})

type TUserResponce = Promise<AxiosResponse<{ data: IUser; meta: null }>>

export const getUsers = (params: string) => instance.get(params)

export const getUserById = (id: number): TUserResponce => instance.get(`/${id}`)

export const patchUserById = ({ id, ...data }: IUser): TUserResponce =>
  instance.patch(`${id}`, data)
