import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

const RecipeCard = ({
  thumbnail, name, index, id, path,
}) => (
  <div data-testid={`${index}-recipe-card`} className="recipe-card">
    <Link
      to={`/${path}/${id}`}
    >
      <img
        src={thumbnail}
        alt={name}
        data-testid={`${index}-card-img`}
        className="recipe-image"
      />
      <h5 data-testid={`${index}-card-name`} className="recipe-title">
        {name}
      </h5>
    </Link>
  </div>
);

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default RecipeCard;
