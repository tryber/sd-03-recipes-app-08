import React from 'react';

const HeaderSearchBar = () => {
  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        placeholder="Buscar Receita"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          name=""
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input type="radio" name="" id="name" data-testid="name-search-radio" />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name=""
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
