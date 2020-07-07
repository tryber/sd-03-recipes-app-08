import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { useFetchDrinkData, useFetchMealsData } from '../hooks';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const mealsData = useFetchMealsData();
  const beverageData = useFetchDrinkData();
  const [foodAreaFilter, setFoodAreaFilter] = useState('');

  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    mealsData,
    beverageData,
    foodAreaFilter,
    setFoodAreaFilter,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
