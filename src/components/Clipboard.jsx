import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../images/shareIcon.svg';

const Clipboard = ({ id, choice }) => {
  const [iconText, setIconText] = useState('Copiar link');

  const IconFunction = () => {
    if (choice === 'meal') {
      const linkMeal = `http://localhost:3000/comidas/${id}`;
      navigator.clipboard.writeText(linkMeal);
    }
    if (choice === 'drink') {
      const linkDrink = `http://localhost:3000/bebidas/${id}`;
      navigator.clipboard.writeText(linkDrink);
    }
    setIconText('Link copiado!');
  };

  return (
    <div>
      <button
        type="button"
        onClick={IconFunction}
        data-testid="share-btn"
      >
        <span>{iconText}</span>
        <img alt="share-icon" src={Icon} />
      </button>
    </div>
  );
};

Clipboard.propTypes = {
  id: PropTypes.string.isRequired,
  choice: PropTypes.string.isRequired,
};

export default Clipboard;
