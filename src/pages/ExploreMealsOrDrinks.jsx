import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRandomRecipeId } from '../hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreByPageLinks from '../components/ExploreByPageLinks';
import profileIcon from '../images/profileIcon.svg';
import { createTitle } from '../helpers/dataHandlers';

const pathToRandom = (location, id) => (location === '/explorar/comidas' ? `/comidas/${id}` : `/bebidas/${id}`);

function ExploreMealsOrDrinks() {
  const location = useLocation();
  const { pathname } = location;
  const { randomRecipeId } = useRandomRecipeId(pathname);

  return (
    <main className="explore-container">
      <Header
        iconProfile={profileIcon}
        title={`Explorar ${createTitle(location)}`}
      />
      <section className="explore-by-links-container">
        <ExploreByPageLinks
          callback={pathToRandom}
          id={randomRecipeId}
          location={pathname}
        />
      </section>
      <Footer />
    </main>
  );
}

export default ExploreMealsOrDrinks;
