import React from 'react';

const HeaderSearchBar = () => {
  return (
    <div>
      <input
        type="text"
        id="search-input"
        placeholder="Buscar Receita"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input type="radio" id="name" data-testid="name-search-radio" />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </div>
  );
};

export default HeaderSearchBar;
