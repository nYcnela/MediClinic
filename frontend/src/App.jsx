import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Home from "./pages/Home.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import AddDoctorForm from "./pages/AddDoctorForm.jsx";
import Layout from "./pages/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppointmentForm from "./pages/AppointmentForm.jsx";
import AppointmentConfirmation from "./pages/AppointmentConfirmation.jsx";
import PacientProfilePage from "./pages/PacientProfilePage.jsx";
import DoctorProfilePage from "./pages/DoctorProfilePage.jsx";
import Login from "./pages/Login.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const ROLES = {
  User: 2001,
  Doctor: 1984,
  Admin: 5150,
};
{/* trzymam to, zeby pamiętać o endpointach, które mam
const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-Doctor",
    element: <AddDoctorForm />,
  },
  {
    path: "/make-appointment",
    element: <AppointmentForm />,
  },
  {
    path: "/confirm-appointment/:id",
    element: <AppointmentConfirmation />,
  },
  {
    path: "/profile",
    element: <PacientProfilePage />,
  },
  {
    path: "/doctor-profile",
    element: <DoctorProfilePage />,
  },
]);
  
*/}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="/" element={<Home/>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />



        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/profile" element={<PacientProfilePage />} />
        </Route>
        {/* we want to protect these routes 
            
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
        >
          <Route path="lounge" element={<Lounge />} />
        </Route>

        <Route path="*" element={<Missing />} />\
*/} 
      </Route>
    </Routes>
  );
}

export default App;
