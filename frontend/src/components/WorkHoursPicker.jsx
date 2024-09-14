import LabelSelectParagraph from "./LabelSelectParagraph";
import {createHoursWithStep } from "../functions/timeFunctions";
import {useState} from "react";


function WorkHoursPicker({start = "8:00", end = "16:00", step=15, workDays, workHours, setHours, flag = false, setEffect = ()=>{}}){  


    
    const start_hours = hours.slice(0,-1)
    const end_hours = hours.slice(1)
    


    return (
        <div>
            <p>Godziny pracy: </p>
            {workDays.map((e,index)=>(
                <div key = {index}>
                    <p>{e.label+":"}</p>
                    <LabelSelectParagraph
                        id = {e.value+"s"}
                        options = {start_hours}
                        labelText="Od: "
                        paragraphText=""
                        setValue={setHours}
                        value = {workHours}
                        isMulti={false}
                        styles={{display:"inline"}}
                        valueIsObject = {true}
                        setEffect={setEffect}
                        flag = {flag}
                    />

                    <LabelSelectParagraph
                        id = {e.value+"e"}
                        options = {end_hours}
                        labelText="Do: "
                        paragraphText=""
                        value = {workHours}
                        setValue={setHours}
                        isMulti={false}
                        styles={{display:"inline"}}
                        valueIsObject = {true}
                    />
                </div>
            ))}
        </div>
      );
}

export default WorkHoursPicker;