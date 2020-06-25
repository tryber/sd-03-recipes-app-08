import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const HeaderPrincipal = ({
  iconProfile, iconSearch, title, onClick,
}) => (
  <header>
    {iconProfile && (
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={iconProfile} alt="ícone de link para perfil do usuário" />
      </Link>
    )}
    <h1 data-testid="page-title">{title}</h1>
    {iconSearch && (
      <button type="button" onClick={onClick} data-testid="search-top-btn">
        <img src={iconSearch} alt="ícone da barra de busca" />
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
