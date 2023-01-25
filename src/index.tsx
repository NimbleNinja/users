import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { App } from './App'
import { store } from './app/store'
import { UserEditPage } from './features/users/components/UserEditPage'
import { UsersTable } from './features/users/components/UsersTable'
import 'react-toastify/dist/ReactToastify.css'

const container = document.getElementById('root')!
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/home',
    element: <App />
  },
  {
    path: '/users',
    element: <UsersTable />
  },
  {
    path: '/users/edit/:userId',
    element: <UserEditPage />
  }
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </Provider>
)
