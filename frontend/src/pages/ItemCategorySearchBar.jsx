import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function ItemCategorySearchBar({getItemsLink, getCategoriesLink, getItemsByCategoryLink, getItemCategoriesByItemIdLink, itemsField, categoriesField, setItem, setCategory}){

  const [items, setItems] = useState(null)
  const [categories, setCategories] = useState(null)

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);


  useEffect(()=>{
    const fetchData = async (link, field, setData, ID = null) => {
      try {
          const response = id === null ? await axios.get(link) : await axios.get(link, {
            params:{
              id: ID
            }
          });

          setData(response.data[field])
          console.log(response.data[field])
      } catch (err) {
          console.log(err)
      } 
    };

    //setItem(selectedItem)
    //setCategory(selectedCategory)

    if(selectedCategory !== null && selectedItem === null) {
      fetchData(getItemsByCategoryLink, itemsField, setItems)
      setIsCategoryDisabled(false);
    } else if(selectedCategory === null && selectedItem !== null){
      setIsCategoryDisabled(true);
    } else {
      fetchData(getItemsLink,itemsField,setItems);
      fetchData(getCategoriesLink,categoriesField,setCategories);
      setIsCategoryDisabled(false);
    }
},
[selectedCategory, selectedItem])

  return (
    <div>
        <Select
            value={selectedItem}
            onChange={setSelectedItem}
            options={items}
            placeholder="Wybierz lekarza"
            isClearable
            styles={customSelectStyles}
        />
        <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={categories}
            placeholder="Wszystkie specjalizacje"
            isClearable
            styles={customSelectStyles}
            isDisabled = {isCategoryDisabled}
        />
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333', // Ciemne tło
    padding: '10px',
    borderRadius: '5px'
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    marginRight: '10px',
    fontSize: '14px',
    backgroundColor: '#444',
    color: '#fff'
  },
 
  searchButton: {
    backgroundColor: '#f60', // Pomarańczowy kolor
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '3px',
    fontSize: '14px',
    cursor: 'pointer',
    textTransform: 'uppercase'
  }
};

const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#444', // Kolor tła w select
    border: 'none',
    color: '#fff',
    width: '200px',
    marginRight: '10px',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#444', // Tło dla menu
    color: '#fff'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#fff' // Kolor wybranej wartości
  })
};

export default ItemCategorySearchBar;
