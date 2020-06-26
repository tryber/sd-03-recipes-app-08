import React from 'react';
import '../styles/HeaderSearchBar.css';

const HeaderSearchBar = () => (
  <div className="search-container">
    <input
      type="text"
      id="search-input"
      placeholder="Buscar Receita"
      data-testid="search-input"
      className="search-input"
    />
    <label htmlFor="ingredient" className="ingredient-search-label">
      <input
        type="radio"
        id="ingredient"
        data-testid="ingredient-search-radio"
      />
      Ingrediente
      <span className="checkmark" />
    </label>
    <label htmlFor="name" className="name-search-label">
      <input type="radio" id="name" data-testid="name-search-radio" />
      Nome
      <span className="checkmark" />
    </label>
    <label htmlFor="first-letter" className="first-letter-search-label">
      <input
        type="radio"
        id="first-letter"
        data-testid="first-letter-search-radio"
      />
      Primeira letra
      <span className="checkmark" />
    </label>
    <button
      type="button"
      data-testid="exec-search-btn"
      className="search-button"
    >
      Buscar
    </button>
  </div>
);

export default HeaderSearchBar;
