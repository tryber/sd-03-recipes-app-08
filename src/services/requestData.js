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
  if (object.filter === 'ingredient' && object.value !== '') return getDrinkByIngredient(object.value);
  if (object.filter === 'name' && object.value !== '') return getDrinkByName(object.value);
  if (object.filter === 'first-letter' && object.value !== '') return getDrinkByFirstLetter(object.value);
  return getDrinkList();
};

function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All' && searchFilters.filter === '') return getDrinkByCategory(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters.filter === '') return getDrinkList();
  return conditionalDrinksSearchFilters(searchFilters);
}

const conditionalFoodsSearchFilters = (object) => {
  if (object.filter === 'ingredient' && object.value !== '') return getFoodByIngredient(object.value);
  if (object.filter === 'name' && object.value !== '') return getFoodByName(object.value);
  if (object.filter === 'first-letter' && object.value !== '') return getFoodByFirstLetter(object.value);
  return getFoodList();
};

function requestFoodsData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All' && searchFilters.filter === '') return getFoodByCategory(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters.filter === '') return getFoodList();
  return conditionalFoodsSearchFilters(searchFilters);
}

export { requestDrinksData, requestFoodsData };
