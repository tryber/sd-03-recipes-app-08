import {
  getDrinksCategoriesList,
  getFoodsCategoriesList,
} from './meals&drinksAPI';
import { requestDrinksData, requestFoodsData } from './requestData';

export const fetchDrinksData = (
  categoriesFilter,
  searchFilters,
  setDrinksData,
  setLoading,
  setError,
) => {
  requestDrinksData(categoriesFilter, searchFilters).then(
    (response) => {
      setDrinksData(response.drinks);
      setLoading(false);
    },
    (response) => {
      setError(response.message);
      setLoading(false);
    },
  );
};

export const fetchDrinksCategories = (
  setCategories,
  setLoading,
  setCategoriesError,
) => {
  getDrinksCategoriesList().then(
    (response) => {
      setCategories(response.drinks);
      setLoading(false);
    },
    (response) => {
      setCategoriesError(response.message);
      setLoading(false);
    },
  );
};

export const fetchFoodsData = (
  categoriesFilter,
  searchFilters,
  setFoodsData,
  setLoading,
  setError,
) => {
  requestFoodsData(categoriesFilter, searchFilters).then(
    (response) => {
      setFoodsData(response.meals);
      setLoading(false);
    },
    (response) => {
      setError(response.message);
      setLoading(false);
    },
  );
};

export const fetchFoodsCategories = (
  setCategories,
  setLoading,
  setCategoriesError,
) => {
  getFoodsCategoriesList().then(
    (response) => {
      setCategories(response.meals);
      setLoading(false);
    },
    (response) => {
      setCategoriesError(response.message);
      setLoading(false);
    },
  );
};
