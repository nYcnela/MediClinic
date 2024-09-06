function LabelSelect({id, options, labelText, paragraphText, setValue, value, isMulti}){
    
    return( isMulti ? 
        <div>
            <label htmlFor={id}>{labelText}</label>
            <select 
                onChange={(e)=> {
                    let choices = value;
                    
                    if(choices.includes(e.target.value)){
                        let index = choices.indexOf(e.target.value);
                        choices.splice(index, 1)
                    }else{
                        choices.push(e.target.value)
                    }

                    setValue(choices);
                    console.log(choices)
                    }
                }
                id = {id}
                name = {id}
                defaultValue = {[]}
                multiple
            >
                <option value = '' disabled>-wybierz-</option>
                {options.map((element, index)=> {
                    return <option  key = {index} value = {element}>{element}</option>
                })}

            </select>
            <p>{paragraphText}</p>
        </div> 
        
        :


        <div>
            <label htmlFor={id}>{labelText}</label>
            <select 
                onChange={(e)=> {
                    setValue(e.target.value);
                }}
                id = {id}
                name = {id}
                defaultValue = ''
            >
                <option value = ''>-wybierz-</option>
                {options.map((element, index)=> {
                    return <option  key = {index} value = {element}>{element}</option>
                })}

            </select>
            <p>{paragraphText}</p>
        </div>

    );
}


export default LabelSelect; 