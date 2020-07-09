import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useBeverageOrMealsContext } from '../hooks';
import '../styles/RecipeCard.css';

const srcSwitch = (path, name) => (path === '/comidas'
  ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
  : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`);

const IngredientCard = ({ name, index, path }) => {
  const location = useLocation();
  const { setSearchFilters } = useBeverageOrMealsContext(location);
  return (
    <Link
      to={`${path}`}
      onClick={() => setSearchFilters(() => ({
        filter: 'ingredient',
        value: name,
      }))}
    >
      <div data-testid={`${index}-ingredient-card`} className="recipe-card">
        <img
          src={srcSwitch(path, name)}
          alt={name}
          data-testid={`${index}-card-img`}
          className="recipe-image"
        />
        <h5 data-testid={`${index}-card-name`} className="recipe-title">
          {name}
        </h5>
      </div>
    </Link>
  );
};

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default IngredientCard;
