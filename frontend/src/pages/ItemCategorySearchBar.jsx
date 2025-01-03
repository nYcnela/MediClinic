import React, { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { set } from "date-fns";
import { axiosPrivate } from "../axios/axios";

function ItemCategorySearchBar({
  getItemsLink,
  getCategoriesLink,
  getItemsByCategoryLink,
  itemsField,
  categoriesField,
  setItem,
  setCategory,
  setItemLabel,
  setCategoryLabel,
}) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

  const fetchData = async (link, field, setter) => {
    try {
      const response = await axios.get(link);
      setter(response.data[field] || []);
    } catch (error) {
      if (error.response.status === 404) {
        console.log("Brak wyników dla wybranych kryteriów");
        setItems([]);
      }
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setIsCategoryDisabled(true);
      
    } else if (selectedCategory) {
      fetchData(
        getItemsByCategoryLink + "/" + selectedCategory,
        itemsField,
        setItems
      );
      setIsCategoryDisabled(false);
    } else {
      fetchData(getItemsLink, itemsField, setItems);
      fetchData(getCategoriesLink, categoriesField, setCategories);
      setIsCategoryDisabled(false);
    }
  }, [selectedCategory, selectedItem]);

  /**
   * Obsługa zmiany w polu "Item" (np. lekarz)
   */
  const handleItemChange = async (event) => {
    const newValue = event.target.value;

    if (newValue === "") {
      setSelectedItem("");
      setItem(null);
    } else {
      setSelectedItem(newValue);
      setItem(newValue);
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].value === event.target.value) {
        setItemLabel(items[i].label);
      }
    }

    if(newValue !==""){
      try{
        const response = await axiosPrivate.get(`http://localhost:5000/doctor/${newValue}?specializations=true`); 
        const { doctor } = response.data;
        const specializationsNames = doctor?.specializations?.map((item) => item.name) || [];       
        const specializationNamesString = specializationsNames.join(', ');
        setCategoryLabel(specializationNamesString);
      }
      catch(error){
        console.error(error);
      }
    }
    
  };

  const handleCategoryChange = (event) => {
    const newValue = event.target.value;

    // Jeśli chcemy „wyczyścić”, ustawiamy pusty string i nullujemy w propsach
    if (newValue === "") {
      setSelectedCategory("");
      setCategory(null);
    } else {
      setSelectedCategory(newValue);
      setCategory(newValue);
    }

    
  };

  return (
    <Box sx={{ display: "flex", gap: 2, width: "80%", flexWrap: "wrap" }}>
      {/* Wybór itemu (np. lekarza) */}
      <FormControl fullWidth sx={{ minWidth: { xs: "100%", sm: "300px" } }}>
        <InputLabel id="select-item-label">Wybierz lekarza</InputLabel>
        <Select
          labelId="select-item-label"
          value={selectedItem}
          onChange={handleItemChange}
          label="Wybierz lekarza"
        >
          {/* Specjalna opcja pozwalająca na wyczyszczenie wyboru */}
          <MenuItem value="">
            <em>Wyczyść wybór</em>
          </MenuItem>

          {items.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {items.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", color: "red" }}>
          <Typography variant="h9">
            Brak dostępnych wyników dla danych kryteriów
          </Typography>
        </Box>
      )}

      {/* Wybór kategorii (np. specjalizacji) */}
      <FormControl fullWidth sx={{ minWidth: { xs: "100%", sm: "300px" } }}>
        <InputLabel id="select-category-label">
          Wybierz specjalizację
        </InputLabel>
        <Select
          labelId="select-category-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Wybierz specjalizację"
          disabled={isCategoryDisabled}
        >
          {/* Specjalna opcja pozwalająca na wyczyszczenie wyboru */}
          <MenuItem value="">
            <em>Wyczyść wybór</em>
          </MenuItem>

          {categories.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ItemCategorySearchBar;
