import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement('#root');
function DeleteAppointmentModal({isModalOpen,setIsModalOpen }){


  function openModal() {
    setIsModalOpen(true);
  }
  

  function closeModal() {
    setIsModalOpen(false);
  }

  return(
    <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
    >
        <h2>Usuawnie wizyty</h2>
        <button onClick={closeModal}>close</button>
        
    </Modal>
  );
  
}

export default DeleteAppointmentModal;
