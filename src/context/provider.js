import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import * as requestFunctions from '../services/meals&drinksAPI';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ value: '', filter: '' });
  const [drinksData, setDrinksData] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [categories, setCategories] = useState([]);

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
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
