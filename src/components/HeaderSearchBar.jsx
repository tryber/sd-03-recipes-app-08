import React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/HeaderSearchBar.css';

const renderSearchInput = (callback, object) => (
  <input
    type="text"
    id="search-input"
    placeholder="Buscar Receita"
    data-testid="search-input"
    className="search-input"
    value={object.value}
    disabled={object.filter === ''}
    onChange={(event) => {
      if (object.filter !== 'first-letter') {
        return callback({ ...object, value: event.target.value });
      }
      if (event.target.value.length === 1 && object.filter === 'first-letter') {
      if (event.target.value.length < 2 && object.filter === 'first-letter') {
        return callback({ ...object, value: event.target.value });
      }
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }}
  />
);

const renderSearchRadioButtons = (callback, object) => (
  <div>
    <label htmlFor="ingredient" className="ingredient-search-label">
      <input
        name="search-type-selection"
        type="radio"
        id="ingredient"
        data-testid="ingredient-search-radio"
        onClick={(event) => callback({ ...object, filter: event.target.id })}
      />
      Ingrediente
    </label>
    <label htmlFor="name" className="name-search-label">
      <input
        type="radio"
        id="name"
        name="search-type-selection"
        data-testid="name-search-radio"
        onClick={(event) => callback({ ...object, filter: event.target.id })}
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
        onClick={(event) => callback({ ...object, filter: event.target.id })}
      />
      Primeira letra
    </label>
  </div>
);

const renderSearchButton = (callback1, callback2, object) => (
  <button
    type="button"
    data-testid="exec-search-btn"
    className="search-button"
    disabled={object.value === '' || object.filter === ''}
    onClick={() => ((
      callback1({ ...object }), callback2({ value: '', filter: '' }))
    )}
      callback1({ ...object }), callback2({ value: '', filter: '' })
    ))}
  >
    Buscar
  </button>
);

const HeaderSearchBar = ({ searchFilters, filters, setFilters }) => (
  <section className="search-container">
    {renderSearchInput(setFilters, filters)}
    {renderSearchRadioButtons(setFilters, filters)}
    {renderSearchButton(searchFilters, setFilters, filters)}
  </section>
);

HeaderSearchBar.propTypes = {
  searchFilters: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({ filter: '', value: '' }).isRequired,
const HeaderSearchBar = ({ searchFilters }) => {
  const [filters, setFilters] = useState({ filter: '', value: '' });
  return (
    <section className="search-container">
      {renderSearchInput(setFilters, filters)}
      {renderSearchRadioButtons(setFilters, filters)}
      {renderSearchButton(searchFilters, setFilters, filters)}
    </section>
  );
};

HeaderSearchBar.propTypes = {
  searchFilters: PropTypes.func.isRequired,
};

export default HeaderSearchBar;
