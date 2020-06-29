import React from 'react';
import PropTypes from 'prop-types';

const DrinkCard = ({ thumbnail, name, index }) => (
  <div>
    <img src={thumbnail} alt={name} data-testid={`${index}-card-img`} />
    <h5 data-testid={`${index}-card-name`}>{name}</h5>
  </div>
);

DrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default DrinkCard;
