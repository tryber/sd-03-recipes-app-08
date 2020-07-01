import {
  getDrinkList,
  getDrinkByCategory,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
  getFoodList,
  getFoodByCategory,
  getFoodByIngredient,
  getFoodByName,
  getFoodByFirstLetter,
} from './meals&drinksAPI';

const conditionalDrinksSearchFilters = (object) => {
  if (object.filter === 'ingredient') return getDrinkByIngredient(object.value);
  if (object.filter === 'name') return getDrinkByName(object.value);
  if (object.filter === 'first-letter') return getDrinkByFirstLetter(object.value);
  return getDrinkList();
};

function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getFoodByCategory(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters === { value: '', filter: '' }) return getDrinkList();
  return conditionalDrinksSearchFilters(searchFilters);
}

const conditionalFoodsSearchFilters = (object) => {
  if (object.filter === 'ingredient') return getFoodByIngredient(object.value);
  if (object.filter === 'name') return getFoodByName(object.value);
  if (object.filter === 'first-letter') getFoodByFirstLetter(object.value);
  return getFoodList();
};

function requestFoodsData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getDrinkByCategory(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters === { value: '', filter: '' }) return getDrinkList();
  return conditionalFoodsSearchFilters(searchFilters);
}

export { requestDrinksData, requestFoodsData };
