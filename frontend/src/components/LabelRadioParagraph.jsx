function LabelRadiosParagraph({id, options, labelText, paragraphText, value, setValue, validateMethod,setErrorMethod}){
    
    const inlStyle = {display:"inline"}

    return(
        <div>
            <label htmlFor={id}>{labelText}</label>
             {options.map((e, index) =>(
                
                    <div key = {index} style= {inlStyle}>
                        <input 
                        type="radio" 
                        value={e.value} 
                        id = {e.value} 
                        name={id} 
                        onClick={(e)=> setValue(e.target.value)}
                        required
                        />
                        <label htmlFor={e.value}>{e.label}</label>
                    </div>
            )
             )}   
            <p>{paragraphText}</p>
        </div> 
       

    );
}

export default LabelRadiosParagraph;



