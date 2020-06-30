import {
  getDrinkList,
  getDrinkByCategorie,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
} from './meals&drinksAPI';

const conditionalsearchFilters = (object) => {
  if (object.filter === 'ingredient') return getDrinkByIngredient(object.value);
  if (object.filter === 'name') return getDrinkByName(object.value);
  if (object.filter === 'first-letter') return getDrinkByFirstLetter(object.value);
  return getDrinkList();
};

export default function requestDrinksData(categoriesFilter, searchFilters) {
  if (categoriesFilter !== 'All') return getDrinkByCategorie(categoriesFilter);
  if (categoriesFilter === 'All' && searchFilters === { value: '', filter: '' }) return getDrinkList();
  return conditionalsearchFilters(searchFilters);
}
