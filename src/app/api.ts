import axios, { AxiosResponse } from 'axios'
import { IPagination, IUser } from '../features/users/usersSlice'

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: process.env.REACT_APP_TOKEN
  }
})

//AxiosResponse<{ data: IUser[]; meta: { pagination: IPagination } }>

type TUserResponce = Promise<AxiosResponse<{ data: IUser; meta: null }>>

export const getUsers = (
  params: string
): Promise<AxiosResponse<{ data: IUser[]; meta: { pagination: IPagination } }>> =>
  instance.get(params)

export const getUserById = (id: number): TUserResponce => instance.get(`/${id}`)

export const patchUserById = ({ id, ...data }: IUser): TUserResponce =>
  instance.patch(`${id}`, data)
