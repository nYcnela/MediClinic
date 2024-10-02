import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginForm from './pages/LoginForm.jsx';
import RegisterForm from './pages/RegisterForm.jsx';
import Home from './pages/Home.jsx';
import AddDoctorForm from './pages/AddDoctorForm.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppointmentForm from './pages/AppointmentForm.jsx';
import AppointmentConfirmation from './pages/AppointmentConfirmation.jsx';



const router = createBrowserRouter([
  
  {
    path: '/register',
    element: <RegisterForm/>
  },
  {
    path: '/login',
    element: <LoginForm/>
  },
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/add-Doctor',
    element: <AddDoctorForm/>
  },
  {
    path: '/make-appointment',
    element: <AppointmentForm/>
  },
  {
    path: '/confirm-appointment/:id',
    element: <AppointmentConfirmation/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


