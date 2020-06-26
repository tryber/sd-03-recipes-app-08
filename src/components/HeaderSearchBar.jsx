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
        name="search-type-selection"
        type="radio"
        id="ingredient"
        data-testid="ingredient-search-radio"
      />
      Ingrediente
    </label>
    <label htmlFor="name" className="name-search-label">
      <input
        type="radio"
        id="name"
        name="search-type-selection"
        data-testid="name-search-radio"
      />
      Nome
    </label>
    <label
      htmlFor="first-letter"
      name="search-type-selection"
      className="first-letter-search-label"
    >
      <input
        type="radio"
        id="first-letter"
        name="search-type-selection"
        data-testid="first-letter-search-radio"
      />
      Primeira letra
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
