function LabelInputParagraph({id, type, value, labelText, onChange, onBlur, paragraphText}){

    return(
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input 
                type = {type}
                id = {id}
                value = {value}
                onChange={onChange}
                onBlur={onBlur}
                required
            >
            </input>
            <p>{paragraphText}</p>
        </div>
        
    );
}


export default LabelInputParagraph; 