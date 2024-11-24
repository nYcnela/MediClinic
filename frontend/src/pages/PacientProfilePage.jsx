import React, { useEffect, useState } from "react";
import PersonalData from "../components/PersonalData";
import UpcomingAppointments from "../components/UpcomingAppointmentsList";
import PastAppointments from "../components/PastAppointments";
import EditPersonalDataModal from "../components/EditPersonalDataModal";
import EditPasswordModal from "../components/EditPasswordModal";
import UpcomingAppointmentsList from "../components/UpcomingAppointmentsList";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserData from "../hooks/useUserData";
import NavBar from "../components/NavBar";

function PacientProfilePage() {
  const [isEditPersonalDataOpen, setEditPersonalDataOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);
  const handleEditPersonalData = () => setEditPersonalDataOpen(true);
  const handleEditPassword = () => setEditPasswordOpen(true);
  const axiosPrivate = useAxiosPrivate();




  return (
    <div className="profile-page">
      <NavBar></NavBar>
      
        <h1>Profil Pacjenta</h1>
        
        <section>
          <PersonalData onEdit={handleEditPersonalData} />
          {/* Modale edycji */}
          {isEditPersonalDataOpen && (
              <EditPersonalDataModal
              isOpen={isEditPersonalDataOpen}
              onClose={() => setEditPersonalDataOpen(false)}
              />
          )}
          <UpcomingAppointmentsList />
          <PastAppointments />
        </section>

        

        {isEditPasswordOpen && (
          <EditPasswordModal
            isOpen={isEditPasswordOpen}
            onClose={() => setEditPasswordOpen(false)}
          />
        )}

        {/* Przycisk do zmiany hasła i emaila */}
        <button onClick={handleEditPassword}>Zmień hasło i e-mail</button>

    </div>
  );
}

export default PacientProfilePage;
