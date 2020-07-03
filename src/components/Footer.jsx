import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

const Footer = () => (
  <footer data-testid="footer" className="recipes-footer">
    <Link to="/bebidas">
      <img
        src={drinkIcon}
        alt="link para lista de bebidas"
        className="drinks-icon"
        data-testid="drinks-bottom-btn"
      />
    </Link>
    <Link to="/explorar">
      <img
        src={exploreIcon}
        alt="link para página de exploração"
        className="explore-icon"
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link to="/comidas">
      <img
        src={mealIcon}
        alt="link para lista de comidas"
        className="food-icon"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);

export default Footer;
