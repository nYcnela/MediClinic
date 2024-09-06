import React,{useState} from "react";
import NavBar from "../components/NavBar";
import DoctorCreateForm from "../components/DoctorCreateForm";

function Home(){
    return(
        <>     
            <NavBar/>
            <DoctorCreateForm/>
        </>
    );
}

export default Home;