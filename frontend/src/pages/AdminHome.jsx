import React,{useState} from "react";
import NavBar from "../components/NavBar";
import AddDoctorForm from "./AddDoctorForm";
import AppointmentForm from "./AppointmentForm";
import ItemCategorySearchBar from "./ItemCategorySearchBar";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function AdminHome(){
    const {auth } = useAuth();
    const name = auth?.name;
    const roles = auth?.roles;
    
    console.log(auth)
    return(
        <>     
        <NavBar></NavBar>
        <h1>Panel Admina{name ? `, ${name}`: ""}!</h1>
        <h3>Czego szukasz?</h3>
        <ul>
            <li><Link to= "/add-doctor">Dodawanie lekarza</Link></li>
            <li><Link to= "/">Odwoływanie wizyty</Link></li>
        </ul>
        </>
    );
}

export default AdminHome;