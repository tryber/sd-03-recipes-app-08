import React, { useContext, useState } from 'react';
import { recipeAppContext } from '../context';
import '../styles/HeaderSearchBar.css';

const HeaderSearchBar = () => {
  const { setSearchFilters } = useContext(recipeAppContext);
  const [filters, setFilters] = useState({ value: '', filter: '' });
  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        placeholder="Buscar Receita"
        data-testid="search-input"
        className="search-input"
        onChange={(event) => setFilters({ ...filters, value: event.target.value })}
      />
      <label htmlFor="ingredient" className="ingredient-search-label">
        <input
          name="search-type-selection"
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onClick={(event) => setFilters({ ...filters, filter: event.target.id })}
        />
        Ingrediente
      </label>
      <label htmlFor="name" className="name-search-label">
        <input
          type="radio"
          id="name"
          name="search-type-selection"
          data-testid="name-search-radio"
          onClick={(event) => setFilters({ ...filters, filter: event.target.id })}
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
          onClick={(event) => setFilters({ ...filters, filter: event.target.id })}
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        className="search-button"
        onClick={
          (() => setSearchFilters({ ...filters }),
          setFilters({ value: '', filter: '' }))
        }
      >
        Buscar
      </button>
    </div>
  );
};

export default HeaderSearchBar;
