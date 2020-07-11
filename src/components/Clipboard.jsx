import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../images/shareIcon.svg';
import '../styles/RecipeDetails.css';

const Clipboard = ({ id, choice, index }) => {
  const [iconUsed, setIconUsed] = useState(false);

  const IconFunction = () => {
    if (choice === 'meal') {
      navigator.clipboard.writeText(`${window.location.origin}/comidas/${id}`);
    }
    if (choice === 'drink') {
      navigator.clipboard.writeText(`${window.location.origin}/bebidas/${id}`);
    }
    setIconUsed(true);
    setTimeout(() => setIconUsed(false), 2000);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => IconFunction()}
        className="share-icon"
      >
        <img
          data-testid={(index !== null) ? `${index}-horizontal-share-btn` : 'share-btn'}
          alt="share-icon"
          src={Icon}
        />
        {iconUsed && <span className="clipboard-span">Link copiado!</span>}
      </button>
    </div>
  );
};

Clipboard.propTypes = {
  id: PropTypes.string.isRequired,
  choice: PropTypes.string.isRequired,
  index: PropTypes.number,
};

Clipboard.defaultProps = {
  index: null,
};

export default Clipboard;
