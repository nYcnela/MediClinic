function InputFieldPatterned({id, label,type,value, onChange}){
    return(
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
                type = {type}
                id = {id}
                value = {value}
                onChange={onChange}
                required
            >
            </input>
        </div>
        
    );
}

export default InputFieldPatterned;