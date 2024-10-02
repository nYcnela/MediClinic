import Select from "react-select";

function LabelSelectParagraph({id,options,labelText,paragraphText,setValue,value,isMulti,styles,}) {
  function onChangeMulti(values) {
    const arr = [];
    values.forEach((element) => arr.push(element));
    console.log(arr);
    setValue(arr);
  }

  function onChangeSingle(value) {
    console.log(value.value);
    setValue(value.value);
  }

  
  return isMulti ? (
    <div style={styles}>
      <label htmlFor={id}>{labelText}</label>
    
      <Select
        id={id}
        options={options}
        onChange={onChangeMulti}
        isMulti={true}
        className="selectWidth"
        styles={{
          container: (provided) => ({ ...provided, display: "inline-block" }),
        }}
        required
      />

      <p>{paragraphText}</p>
    </div>
  ) : (
    <div style={styles}>
      <label htmlFor={id}>{labelText}</label>
      <Select
        id={id}
        options={options}
        onChange={onChangeSingle}
        isMulti={false}
        styles={{
          container: (provided) => ({ ...provided, display: "inline-block" }),
        }}
        required
      />
      <p>{paragraphText}</p>
    </div>
  );
}

export default LabelSelectParagraph;
