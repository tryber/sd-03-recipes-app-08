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

  const fetchDrinks = () => {
    setLoading(true);
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
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
