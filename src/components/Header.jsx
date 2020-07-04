import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderSearchBar from './HeaderSearchBar';
import '../styles/Header.css';

const Header = ({
  iconProfile,
  iconSearch,
  title,
  searchFilters,
}) => {
  const [show, setShow] = useState(false);

  return (
    <header className="recipes-header">
      {iconProfile && (
        <Link to="/perfil">
          <img
            src={iconProfile}
            alt="ícone de link para perfil do usuário"
            className="profile-link"
            data-testid="profile-top-btn"
          />
        </Link>
      )}
      <h1 data-testid="page-title" className="header-title">
        {title}
      </h1>
      {iconSearch && (
        <input
          type="image"
          src={iconSearch}
          alt="ícone da barra de busca"
          className="search-link"
          onClick={() => setShow(!show)}
          data-testid="search-top-btn"
        />
      )}
      <div>
        {show && (
          <HeaderSearchBar
            searchFilters={searchFilters}
          />
        )}
      </div>
    </header>
  );
};
Header.defaultProps = {
  iconProfile: null,
  iconSearch: null,
  title: '',
  searchFilters: undefined,
};

Header.propTypes = {
  iconProfile: PropTypes.node,
  iconSearch: PropTypes.node,
  title: PropTypes.string,
  searchFilters: PropTypes.func,
};

export default Header;
