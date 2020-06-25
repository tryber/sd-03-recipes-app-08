import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Header.css';

const HeaderPrincipal = ({ iconProfile, iconSearch, title, onClick }) => (
  <header className="recipes-header">
    {iconProfile && (
      <Link to="/perfil" data-testid="profile-top-btn">
        <img
          src={iconProfile}
          alt="ícone de link para perfil do usuário"
          className="profile-link"
        />
      </Link>
    )}
    <h1 data-testid="page-title" className="header-title">
      {title}
    </h1>
    {iconSearch && (
      <button type="button" onClick={onClick} data-testid="search-top-btn">
        <img
          src={iconSearch}
          alt="ícone da barra de busca"
          className="search-link"
        />
      </button>
    )}
  </header>
);
HeaderPrincipal.defaultProps = {
  iconProfile: null,
  iconSearch: null,
  onClick: undefined,
};

HeaderPrincipal.propTypes = {
  iconProfile: PropTypes.node,
  iconSearch: PropTypes.node,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default HeaderPrincipal;
