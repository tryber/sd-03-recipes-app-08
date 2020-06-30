
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import * as requestFunctions from '../services/meals&drinksAPI';

const initialState = {
  value: '',
  filter: '',
  idMeal: '',
  idDrink: '',
};

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState(initialState);
  const [drinksData, setDrinksData] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [categories, setCategories] = useState([]);
  const [mealID, setMealID] = useState(initialState);
  const [cocktailID, setCocktailID] = useState(initialState);
  const [mealDetailData, setMealDetailData] = useState([]);
  const [drinkDetailData, setDrinkDetailData] = useState([]);

  const fetchDrinks = () => {
    requestFunctions.getDrinkList().then(
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

  const fetchDrinksCategories = () => {
    requestFunctions.getDrinksCategoriesList().then(
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

  const fetchMealID = (elem) => {
    requestFunctions.getFoodByID(elem).then(
      (response) => {
        setMealDetailData(response.meals);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchDrinkID = (elem) => {
    requestFunctions.getDrinkByID(elem).then(
      (response) => {
        setDrinkDetailData(response.drinks);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    drinksData,
    setDrinksData,
    error,
    setError,
    loading,
    setLoading,
    searchFilters,
    setSearchFilters,
    fetchDrinks,
    categories,
    setCategories,
    categoriesError,
    setCategoriesError,
    fetchDrinksCategories,
    mealID,
    setMealID,
    cocktailID,
    setCocktailID,
    fetchMealID,
    fetchDrinkID,
    mealDetailData,
    setMealDetailData,
    drinkDetailData,
    setDrinkDetailData,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
