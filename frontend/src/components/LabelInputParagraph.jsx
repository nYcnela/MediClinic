function LabelInputParagraph({id, type, value, labelText, paragraphText, validateMethod = (a,b,c,d)=>{}, setValueMethod, setErrorMethod= ()=>{}, setStatusMethod= ()=>{}}){

    return(
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input 
                type = {type}
                id = {id}
                value = {value}
                onChange={(e)=> setValueMethod(e.target.value)}
                onBlur={() => validateMethod(value,setErrorMethod,setStatusMethod, setValueMethod)}
                required
            >
            </input>
            <p>{paragraphText}</p>
        </div>
        
    );
}

export default LabelInputParagraph; 