import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Explore.css';

function Explore() {
  return (
    <main className="explore-container">
      <Header iconProfile={profileIcon} title="Explorar" />
      <section className="explore-links-container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}

export default Explore;
