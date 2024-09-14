export function calculateHour(start_h, start_min, offset){
    let hours = start_h + Math.floor((start_min + offset) / 60)   
    let minutes = (start_min + offset) % 60
    
    return [(hours) % 24, minutes]
}

export function createHoursWithStep(start,end,step){

    const [st_h, st_min] = start.split(":").map(e => Number(e))
    const [end_h, end_min]= end.split(":").map(e => Number(e))


    const hours = []
    let finished = false
    hours.push({label: start, value: st_h+""+st_min})


    let [temp_h, temp_min] = [st_h, st_min]

    while(!finished){
        [temp_h,temp_min] = calculateHour(temp_h,temp_min,step)
        if(temp_h > end_h || (temp_h == end_h && temp_min > end_min)) finished = true
        else{
            if(temp_h >= 10){
                hours.push(temp_min >= 10? {label: temp_h+":"+temp_min, value:temp_h+":"+temp_min} : {label: temp_h+":0"+temp_min, value: temp_h+":0"+temp_min})
            }else{
                hours.push(temp_min >= 10? {label: "0"+temp_h+":"+temp_min, value: "0"+temp_h+":"+temp_min} : {label: "0"+temp_h+":0"+temp_min, value: "0"+temp_h+":0"+temp_min})
            }
            
        }
    }
    return hours;
   
}