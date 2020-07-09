import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeDetails.css';
import FavoriteButton from './FavoriteButton';
import Clipboard from './Clipboard';

const InteractiveButtons = ({ data, choice }) => (
  <div className="details-header-button">
    <Clipboard id={data.id} choice={choice} />
    <FavoriteButton data={data} />
  </div>
);

export default InteractiveButtons;

InteractiveButtons.propTypes = {
  choice: PropTypes.string.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.string,
    video: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
