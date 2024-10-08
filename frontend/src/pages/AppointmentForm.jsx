import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";    
import { format } from 'date-fns'; // Możemy użyć date-fns do dalszego formatowania
import ItemCategorySearchBar from "./ItemCategorySearchBar";
import AppointmentCard from "../components/AppointmentCard";
import NavBar from "../components/NavBar";
import { getAppointmentsBySpecAndDate } from "../functions/requests";

function AppointmentForm(){

    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
  
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState(null);

    const [isSearchButtonVisible, setIsSearchButtonVisible] = useState(false)
    const [availableTerms, setAvailableTerms] = useState([])

    
    useEffect(()=>{
      if(selectedDoctor===null && selectedSpecialization===null){
        setIsSearchButtonVisible(false)
      }else{
        setIsSearchButtonVisible(true)
      }
    },
    [selectedDoctor,selectedSpecialization])


  const handleDateChange = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy HH:mm');
    console.log(date)
    console.log(formattedDate)
    setFormattedDate(formattedDate);
    setSelectedDate(date)
  };

  const handleSearchClick = () => {
    const appointments = selectedDoctor === null ? getAppointmentsBySpecAndDate() : " XDDDDDDDD"
  }

  return (
    <div>
        <NavBar/>
        
        <h1>Szukaj wizyty</h1> 
        <h3>Wybierz lekarza lub specjalizację: </h3>

        <ItemCategorySearchBar
            getItemsLink = 'http://localhost:5000/doctor/list'
            getCategoriesLink = 'http://localhost:5000/doctor/specializations?unique=true'
            getItemsByCategoryIdLink
            getItemCategoriesByItemIdLink
            itemsField = 'doctors'
            categoriesField = 'specializations'
            setItem
            setCategory
        />

        <h3>Wyszukaj wolny termin: </h3>
        
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy HH:mm" 
          placeholderText="Wybierz datę"
          timeInputLabel="Po godzinie:"
          inline
          showTimeInput
        />

        {isSearchButtonVisible ? (
          <button onClick={()=>{
            console.log(`szukasz: lekarz: ${selectedDoctor !== null ? selectedDoctor.label : "Nie wybrałeś"}, specjalizacja: ${selectedSpecialization !== null ? selectedSpecialization.label+selectedSpecialization.value : "nie wybrałeś"}, po : ${formattedDate}`) 
         } }>Szukaj</button>
        )
          :
        (
          <></>
        )}

        <AppointmentCard
          title = "lek. Katarzyna Lachowska"
          specialties = "Pediatra" 
          data = "09.08.2024 17:00"
        />

        

    </div>
  );
}

export default AppointmentForm;