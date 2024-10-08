import React, { useState } from "react";
import PersonalData from "../components/PersonalData";
import UpcomingAppointments from "../components/UpcomingAppointmentsList";
import PastAppointments from "../components/PastAppointments";
import EditPersonalDataModal from "../components/EditPersonalDataModal";
import EditPasswordModal from "../components/EditPasswordModal";
import UpcomingAppointmentsList from "../components/UpcomingAppointmentsList";

function PacientProfilePage() {
  const [isEditPersonalDataOpen, setEditPersonalDataOpen] = useState(false);
  const [isEditPasswordOpen, setEditPasswordOpen] = useState(false);

  const handleEditPersonalData = () => setEditPersonalDataOpen(true);
  const handleEditPassword = () => setEditPasswordOpen(true);

  return (
    <div className="profile-page">
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
