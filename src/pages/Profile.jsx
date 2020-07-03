import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Profile.css';

const Profile = () => {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile-container">
      <Header iconProfile={profileIcon} title="Perfil" />
      <h2 className="profile-user-email">{userEmail.email}</h2>
      <div className="profile-links-container">
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            onClick={() => localStorage.clear()}
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
