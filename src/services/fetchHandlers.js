import {
  getDrinksCategoriesList,
  getFoodsCategoriesList,
  getRandomFood,
  getRandomDrink,
  getAllFoodIngredients,
  getAllDrinkIngredients,
  getAllFoodAreas,
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

export const fetchRandomMeal = (setRandomRecipeId, setRandomRecipeIdError) => {
  getRandomFood().then(
    (response) => setRandomRecipeId(response.meals[0].idMeal),
    (response) => setRandomRecipeIdError(response.message),
  );
};

export const fetchRandomDrink = (setRandomRecipeId, setRandomRecipeIdError) => {
  getRandomDrink().then(
    (response) => setRandomRecipeId(response.drinks[0].idDrink),
    (response) => setRandomRecipeIdError(response.message),
  );
};

export const fetchFoodIngredients = (
  setIngredientsList,
  setIngredientsListError,
) => {
  getAllFoodIngredients().then(
    (response) => setIngredientsList(response.meals),
    (response) => setIngredientsListError(response.message),
  );
};

export const fetchDrinkIngredients = (
  setIngredientsList,
  setIngredientsListError,
) => {
  getAllDrinkIngredients().then(
    (response) => setIngredientsList(response.drinks),
    (response) => setIngredientsListError(response.message),
  );
};

export const fetchAllFoodAreas = (setFoodAreas, setFoodAreasError) => {
  getAllFoodAreas().then(
    (response) => setFoodAreas(response.meals),
    (response) => setFoodAreasError(response.message),
  );
};
