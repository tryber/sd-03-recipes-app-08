import {
  getDrinkList,
  getDrinkByCategorie,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
} from './meals&drinksAPI';

export default function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getDrinkByCategorie(categoriesFilter);
  if (searchFilters.filter === 'ingredient') return getDrinkByIngredient(searchFilters.value);
  if (searchFilters.filter === 'name') return getDrinkByName(searchFilters.value);
  if (searchFilters.filter === 'first-letter') return getDrinkByFirstLetter(searchFilters.value);
  return getDrinkList();
}
