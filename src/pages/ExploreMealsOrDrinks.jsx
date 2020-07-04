import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import {
  createTitle,
} from '../helpers/dataHandlers';

function ExploreMealsOrDrinks() {
  const location = useLocation();
  return (
    <main className="explore-container">
      <Header iconProfile={profileIcon} title={`Explorar ${createTitle(location)}`} />
      <section className="explore-by-links-container">
        <Link to={`/explorar/${location.pathname}/ingredientes`}>
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        {location.pathname === 'comidas' && (
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        )}
        <Link to="">
          <button
            type="button"
            data-testid="explore-surprise"
            className="explore-surprise"
          >
            Me Surpreenda
          </button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}

export default ExploreMealsOrDrinks;
