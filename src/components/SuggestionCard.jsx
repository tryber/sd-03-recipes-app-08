import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuggestionCard = ({
  thumbnail, name, index, id, path,
}) => (
  <Link
    to={`/${path}/${id}`}
  >
    <div data-testid={`${index}-recomendation-card`} className="recomendation-card">
      <img
        src={thumbnail}
        alt={name}
        data-testid={`${index}-recomendation-img`}
        className="recomendation-image"
      />
      <h5 data-testid={`${index}-recomendation-title`} className="recomendation-title">
        {name}
      </h5>
    </div>
  </Link>
);

SuggestionCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default SuggestionCard;
