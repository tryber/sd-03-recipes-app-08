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

const conditionalsearchFilters = (object) => {
  if (object.filter === 'ingredient') return getDrinkByIngredient(object.value);
  if (object.filter === 'name') return getDrinkByName(object.value);
  if (object.filter === 'first-letter') return getDrinkByFirstLetter(object.value);
  return getDrinkList();
};

export function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getDrinkByCategorie(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters === { value: '', filter: '' }) return getDrinkList();
  return conditionalsearchFilters(searchFilters);
}

const conditionalsearchFiltersFood = (object) => {
  if (object.filter === 'ingredient') return getFoodByIngredient(object.value);
  if (object.filter === 'name') return getFoodByName(object.value);
  if (object.filter === 'first-letter') return getFoodByFirstLetter(object.value);
  return getFoodList();
};

export function requestFoodsData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getFoodByCategorie(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters === { value: '', filter: '' }) return getFoodList();
  return conditionalsearchFiltersFood(searchFilters);
}

