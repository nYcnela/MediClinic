import Select from "react-select";
import LabelSelectParagraph from "./LabelSelectParagraph";
import { useEffect, useState } from "react";
import { validateHoursRange } from "../functions/timeFunctions";


function RangePicker({label ,field,  options, labelOne, labelTwo, startRangeField, endRangeField, object, setObject}){

    const [rangeStart, setRangeStart] = useState("")
    const [rangeEnd, setRangeEnd] = useState("")

    
    useEffect(()=>{
        const obj = {
            ...object,
            [field] : {[startRangeField]: rangeStart, [endRangeField]: rangeEnd}
        }
        setObject(obj)
        if(rangeStart != "" && rangeEnd != ""){
            validateHoursRange(rangeStart,rangeEnd)
        }
    }, [rangeStart,rangeEnd])

    return(
        <>
            <p>{label}</p>
            <LabelSelectParagraph
                options = {options}
                labelText={labelOne}
                paragraphText=""
                setValue={setRangeStart}
                value = {rangeStart}
                isMulti={false}
            />

            <LabelSelectParagraph
                options = {options}
                labelText={labelTwo}
                paragraphText=""
                setValue={setRangeEnd}
                value = {rangeEnd}
                isMulti={false}
            />
                
        </>
    );
    
}

export default RangePicker;










function onChangeNested(e) {
    const day = id.slice(0, -1);
    const str = id.slice(day.length) == "s" ? "start" : "end";
    console.log("jestyem tu");
    setValue({
      ...value,
      [day]: {
        ...value[day],
        [str]: e.value,
      },
    });
  }