import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import {
  createTitle,
} from '../helpers/dataHandlers';
import ExploreByPageLinks from '../components/ExploreByPageLinks';

const pathToRandom = (location, id) => (location.pathname === '/explorar/comidas' ? `/comidas/${id}` : `/bebidas/${id}`);

function ExploreMealsOrDrinks() {
  const location = useLocation();
  return (
    <main className="explore-container">
      <Header iconProfile={profileIcon} title={`Explorar ${createTitle(location)}`} />
      <section className="explore-by-links-container">
      <ExploreByPageLinks callback={pathToRandom} id={} location={location.pathname} />
      </section>
      <Footer />
    </main>
  );
}

export default ExploreMealsOrDrinks;
