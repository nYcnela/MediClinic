import React,{useState} from "react";
import NavBar from "../components/NavBar";
import AddDoctorForm from "./AddDoctorForm";
import AppointmentForm from "./AppointmentForm";
import ItemCategorySearchBar from "./ItemCategorySearchBar";

function Home(){
    return(
        <>     
        <NavBar></NavBar>
        <h1>Home strona gowno tzw</h1>
        </>
    );
}

export default Home;