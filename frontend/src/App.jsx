import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/Login.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Home from "./pages/Home.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import AddDoctorForm from "./pages/AddDoctorForm.jsx";
import Layout from "./pages/Layout.jsx";
import AppointmentForm from "./pages/AppointmentForm.jsx";
import AppointmentConfirmation from "./pages/AppointmentConfirmation.jsx";
import PacientProfilePage from "./pages/PacientProfilePage.jsx";
import DoctorProfilePage from "./pages/DoctorProfilePage.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import SignIn from "./pages/sign-in/SignIn.jsx";
import SignUp from "./pages/sign-up/SignUp.jsx";
import RegistrationSuccess from "./pages/RegistrationSuccess.jsx";
import DoctorCreated from "./pages/DoctorCreated.jsx";
import DeleteUsers from "./pages/DeleteUsers.jsx";
import DoctorHome from "./pages/DoctorHome.jsx";
import DoctorsList from "./pages/DoctorsList.jsx";
import DoctorDetails from "./pages/DoctorDetails.jsx";

const ROLES = {
  User: "user",
  Doctor: "doctor",
  Admin: "admin",
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route path="login" element={<SignIn></SignIn>} />
        <Route path="register" element={<SignUp></SignUp>} />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        
        <Route path="/doctors-list" element={<DoctorsList />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/profile" element={<PacientProfilePage />} />
          <Route
            path="/confirm-appointment"
            element={<AppointmentConfirmation />}
          />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/make-appointment" element={<AppointmentForm />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Doctor]} />}>
          <Route path="/doctor-profile" element={<DoctorProfilePage />} />
          <Route path="/doctor-home" element={<DoctorHome />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/add-doctor" element={<AddDoctorForm />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/delete-users" element={<DeleteUsers />} />
          <Route path="/doctor-created" element={<DoctorCreated />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
