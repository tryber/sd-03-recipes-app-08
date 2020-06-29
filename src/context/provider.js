import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
    <RecipeAppProvider.Provider value={context}>
      {children}
    </RecipeAppProvider.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
