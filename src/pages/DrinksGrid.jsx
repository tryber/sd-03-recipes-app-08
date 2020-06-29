import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksCard from '../components/DrinkCard';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function DrinksGrid() {
  return (
    <div>
      <Header
        iconProfile={profileIcon}
        iconSearch={searchIcon}
        title="Bebidas"
      />
      <Footer />
    </div>
  );
}

export default DrinksGrid;
