import {
  getDrinkList,
  getDrinkByCategorie,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
  getFoodList,
  getFoodByCategorie,
  getFoodByIngredient,
  getFoodByName,
  getFoodByFirstLetter,
} from './meals&drinksAPI';

export function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getDrinkByCategorie(categoriesFilter);
  if (searchFilters.filter === 'ingredient') return getDrinkByIngredient(searchFilters.value);
  if (searchFilters.filter === 'name') return getDrinkByName(searchFilters.value);
  if (searchFilters.filter === 'first-letter') return getDrinkByFirstLetter(searchFilters.value);
  return getDrinkList();
}

export function requestFoodsData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getFoodByCategorie(categoriesFilter);
  if (searchFilters.filter === 'ingredient') return getFoodByIngredient(searchFilters.value);
  if (searchFilters.filter === 'name') return getFoodByName(searchFilters.value);
  if (searchFilters.filter === 'first-letter') return getFoodByFirstLetter(searchFilters.value);
  return getFoodList();
}

