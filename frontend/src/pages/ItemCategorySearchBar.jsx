import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Z react-select
import { filterItemsByCategory } from '../functions/requests';
function ItemCategorySearchBar({items, categories, categoryField, setItem, setCategory}){

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

  let cats = categories;

  function filterItemsByCategory(items, field, selectedCategory) {
    return items.filter(item => item[field] === selectedCategory)
                .map(item => ({ value: item.value, label: item.label })); 
  }

  


useEffect(() => {
  setItem(selectedItem);
  setCategory(selectedCategory);

  if (selectedCategory !== null && selectedItem === null) {
    setFilteredItems(filterItemsByCategory(items, categoryField, selectedCategory));
    setIsCategoryDisabled(false);
  } else if(selectedCategory === null && selectedItem !== null){
    setIsCategoryDisabled(true);
  } 
  else {
    setFilteredItems(items); // Reset do wszystkich elementów
    setIsCategoryDisabled(false);
  }
}, [selectedItem, selectedCategory, items]);

  

 

  return (
    <div>
        <Select
            value={selectedItem}
            onChange={setSelectedItem}
            options={filteredItems}
            placeholder="Wybierz lekarza"
            isClearable
            styles={customSelectStyles}
        />
        <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={cats}
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
