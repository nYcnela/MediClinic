function LabelCheckboxParagraph({id, options, labelText, paragraphText, setValue}){
    return(
        
        <div>
            <label htmlFor={id}>{labelText}</label>
             {options.map((e, index) => {
                return(
                    <>
                        <input key = {String(index)} type="checkbox" value={e} id={e} name={id} onClick={()=> setValue(e)}/>
                        <label htmlFor={e}>{e}</label>
                    </>
            )
             })}   
            <p>{paragraphText}</p>
        </div> 
       

    );
}

export default LabelCheckboxParagraph;



