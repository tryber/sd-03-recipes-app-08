import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

const Footer = () => (
  <footer data-testid="footer" className="recipes-footer">
    <Link to="/bebidas" data-testid="drinks-bottom-btn">
      <img
        src={drinkIcon}
        alt="link para lista de bebidas"
        className="drinks-icon"
      />
    </Link>
    <Link to="/explorar" data-testid="explore-bottom-btn">
      <img
        src={exploreIcon}
        alt="link para página de exploração"
        className="explore-icon"
      />
    </Link>
    <Link to="/comidas" data-testid="food-bottom-btn">
      <img
        src={mealIcon}
        alt="link para lista de comidas"
        className="food-icon"
      />
    </Link>
  </footer>
);

export default Footer;
