
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import * as requestFunctions from '../services/meals&drinksAPI';

const initialState = {
  value: '',
  filter: '',
  id: '',
  choice: 'meal',
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
  const [selectedID, setSelectedID] = useState(initialState.id);
  const [mealDetailData, setMealDetailData] = useState({ meals: [] });
  const [drinkDetailData, setDrinkDetailData] = useState({ drinks: [] });
  const [favorite, setFavorite] = useState(false);
  const [choice, setChoice] = useState(initialState.choice);

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

  const fetchRandomMealID = () => {
    requestFunctions.getRandomFood().then(
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

  const fetchRandomDrinkID = () => {
    requestFunctions.getRandomDrink().then(
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
    selectedID,
    setSelectedID,
    fetchMealID,
    fetchDrinkID,
    mealDetailData,
    setMealDetailData,
    drinkDetailData,
    setDrinkDetailData,
    favorite,
    setFavorite,
    fetchRandomMealID,
    fetchRandomDrinkID,
    choice,
    setChoice,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
