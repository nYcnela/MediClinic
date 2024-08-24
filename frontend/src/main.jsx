import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  
  {
    path: '/register',
    element: <RegisterForm/>
  },
  {
    path: '/login',
    element: <LoginForm/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


