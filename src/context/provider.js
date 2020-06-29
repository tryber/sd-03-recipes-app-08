import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [searchFilters, setSearchFilters] = useState({ value: '', filter: '' });

  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    searchFilters,
    setSearchFilters,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
