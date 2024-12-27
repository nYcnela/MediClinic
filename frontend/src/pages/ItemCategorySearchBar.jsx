import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

function ItemCategorySearchBar({
  getItemsLink,
  getCategoriesLink,
  getItemsByCategoryLink,
  itemsField,
  categoriesField,
  setItem,
  setCategory,
}) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

  /**
   * Funkcja pomocnicza do pobierania danych z API
   */
  const fetchData = async (link, field, setter) => {
    try {
      const response = await axios.get(link);
      setter(response.data[field] || []);
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  };

  useEffect(() => {
    if (selectedCategory && !selectedItem) {
      // Gdy wybrano kategorię, ale nie wybrano itemu:
      fetchData(getItemsByCategoryLink, itemsField, setItems);
      setIsCategoryDisabled(false);
    } else if (!selectedCategory && selectedItem) {
      // Gdy wybrano item, ale nie wybrano kategorii:
      setIsCategoryDisabled(true);
    } else {
      // Stan początkowy lub wyczyszczone filtry:
      fetchData(getItemsLink, itemsField, setItems);
      fetchData(getCategoriesLink, categoriesField, setCategories);
      setIsCategoryDisabled(false);
    }
  }, [
    selectedCategory,
    selectedItem,
    getItemsByCategoryLink,
    itemsField,
    getItemsLink,
    getCategoriesLink,
    categoriesField,
  ]);

  /**
   * Obsługa zmiany w polu "Item" (np. lekarz)
   */
  const handleItemChange = (event) => {
    const newValue = event.target.value;

    // Jeśli chcemy „wyczyścić”, ustawiamy pusty string i nullujemy w propsach
    if (newValue === '') {
      setSelectedItem('');
      setItem(null);
    } else {
      setSelectedItem(newValue);
      setItem(newValue);
    }
  };

  /**
   * Obsługa zmiany w polu "Category" (np. specjalizacja)
   */
  const handleCategoryChange = (event) => {
    const newValue = event.target.value;

    // Jeśli chcemy „wyczyścić”, ustawiamy pusty string i nullujemy w propsach
    if (newValue === '') {
      setSelectedCategory('');
      setCategory(null);
    } else {
      setSelectedCategory(newValue);
      setCategory(newValue);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '80%', flexWrap: 'wrap' }}>
      {/* Wybór itemu (np. lekarza) */}
      <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: '300px' } }}>
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

      {/* Wybór kategorii (np. specjalizacji) */}
      <FormControl fullWidth sx={{ minWidth: { xs: '100%', sm: '300px' } }}>
        <InputLabel id="select-category-label">Wybierz specjalizację</InputLabel>
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
