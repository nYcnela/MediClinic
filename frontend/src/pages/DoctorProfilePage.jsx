import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import UpcomingAppointmentsList from "../components/UpcomingAppointmentsList";
import DoctorCallendar from "../components/DoctorCallendar";

function DoctorProfilePage({}){
    const [isListViewChoosen, setIsListViewChoosen] = useState(true)
    const options = [
        {
            label: <span>Widok listy</span>,
            value: "list",
            selectedBackgroundColor: "#0097e6",
        },
        {
            label: <span>Widok harmonogramu</span>,
            value: "harmo",
            selectedBackgroundColor: "#fbc531"
        }
     ];



    const data = {
        name: "Jan",
        surname: "Żołnowski",
        degree: "dr. n. med",
        specializations: ["Ortopedia"],
        phoneNumber: "+48 730 560 543",
        email: "dzon@gmail.com"
    }
    const onChange = (newValue) => {
        console.log(newValue);
        setIsListViewChoosen(!isListViewChoosen)
    };
    
    return(
        <div  style={{width:"50%", marginLeft:"25%"}}>
            <h1>Profil lekarza</h1>
            <div>
                <div style={{display:"inline-block"}}>
                    <h3>Dane osobowe</h3>
                    <p>Imię: {data.name}</p>
                    <p>Nazwisko: {data.surname}</p>
                    <p>Stopień naukowy: {data.degree}</p>
                    <p>{data.specializations.length == 1 ? "Specjalizacja: " : "Specjalizacje: "} {data.specializations}</p>
                </div>
                <div style={{display:"inline-block", marginLeft:"10%"}}>
                    <h3>Dane kontaktowe</h3>
                    <p>Numer telefonu: {data.phoneNumber}</p>
                    <p>Adres-email: {data.email}</p>
                </div>
                
            </div>
            <div>
                <h3>Nadchodzące wizyty</h3>
                <div></div>
            </div>
            <div className="your-required-wrapper" style={{width: "40%", padding:"5% 0% 5% 0%"} }>
                <SwitchSelector
                    onChange={onChange}
                    options={options}
                    initialSelectedIndex={0}
                    backgroundColor={"#353b48"}
                    fontColor={"#f5f6fa"}
                />
            </div>
            {isListViewChoosen && (
                <UpcomingAppointmentsList/>
            )}
            <div id = "calldupa">
            {!isListViewChoosen && (
                <DoctorCallendar/>
            )}
            </div>
            
        </div>
    );
}
export default DoctorProfilePage;