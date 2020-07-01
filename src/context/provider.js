import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { useFetchDrinkData, useFetchMealsData } from '../hooks';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [searchFilters, setSearchFilters] = useState({ filter: '', value: '' });
  const [categoriesFilter, setCategoriesFilter] = useState('All');

  const mealsData = useFetchMealsData(searchFilters, categoriesFilter);

  const beverageData = useFetchDrinkData(searchFilters, categoriesFilter);

  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    searchFilters,
    setSearchFilters,
    categoriesFilter,
    setCategoriesFilter,
    mealsData,
    beverageData,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
