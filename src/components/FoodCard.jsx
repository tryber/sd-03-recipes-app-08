import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DrinkCard.css';

const FoodCard = ({ thumbnail, name, index }) => (
  <div data-testid={`${index}-recipe-card`} className="recipe-card">
    <img src={thumbnail} alt={name} data-testid={`${index}-card-img`} className="recipe-image" />
    <h5 data-testid={`${index}-card-name`} className="recipe-title">{name}</h5>
  </div>
);

FoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default FoodCard;
