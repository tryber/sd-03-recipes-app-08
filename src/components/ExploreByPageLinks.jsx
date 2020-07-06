import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ExploreByPageLinks = ({ location, callback, id }) => (
  <div>
    <Link to={`${location}/ingredientes`}>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        className="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
    </Link>
    {location === '/explorar/comidas' && (
    <Link to="/explorar/comidas/area">
      <button
        type="button"
        data-testid="explore-by-area"
        className="explore-by-area"
      >
        Por Local de Origem
      </button>
    </Link>
    )}
    <Link to={callback(location, id)}>
      <button
        type="button"
        data-testid="explore-surprise"
        className="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </Link>
  </div>
);

ExploreByPageLinks.propTypes = {
  callback: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default ExploreByPageLinks;
