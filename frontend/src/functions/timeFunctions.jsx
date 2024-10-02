export function calculateHour(start_h, start_min, offset){

    let hours = start_h + Math.floor((start_min + offset) / 60)   
    let minutes = (start_min + offset) % 60
    
    return [(hours) % 24, minutes]
}

function convertNumsToHour(hour,mins){
    if(hour<10){
        if(mins < 10){
            return {label: `${"0"+hour+":0"+mins}`,value: `${"0"+hour+":0"+mins}`}
        }else{
            return {label:`${"0"+hour+":"+mins}` ,value:`${"0"+hour+":"+mins}`} 
        }
    }else{
        if(mins < 10){
            return  {label:`${hour+":0"+mins}` ,value:`${hour+":0"+mins}`}
        }else{
            return {label:`${hour+":"+mins}` ,value:`${hour+":"+mins}`}
        }
    }
}

export function createHoursWithStep(h1_hour, h1_min, h2_hour,h2_min, step){

    let finished = false
    const hours = []
    
    hours.push(convertNumsToHour(h1_hour,h1_min))
    
    let [temp_h, temp_min] = [h1_hour, h1_min]

    while(!finished){
        [temp_h,temp_min] = calculateHour(temp_h,temp_min,step)
        if(temp_h > h2_hour || (temp_h == h2_hour && temp_min > h2_min)) finished = true
        else{
            hours.push(convertNumsToHour(temp_h,temp_min))
        }
    }
    return hours;
   
}


export function validateHoursRange(firtsHour,secondHour,setStatus, setError){
    let hourOne = firtsHour.split(":")
    let hourTwo = secondHour.split(":")
    hourOne = hourOne.map(e => e.at(0) != "0" ? Number(e) : Number(e.slice(1)))
    hourTwo = hourTwo.map(e => e.at(0) != "0" ? Number(e) : Number(e.slice(1)))
    if(hourOne[0]==hourTwo[0]&& hourOne[1] == hourTwo[1]){
        setError("Ta sama godzina")
        setStatus(false)
        return; 
    }else if(hourOne[0] == hourTwo[0] && hourOne[1] > hourTwo[1]){
        setError("Blędny zakres")
        setStatus(false)
        return;
    }else if(hourOne[0] > hourTwo[0]){
        setError("Blędny zakres")
        setStatus(false)
        return;
    }
    setError("")
    setStatus(true)
}