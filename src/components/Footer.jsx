import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <img
        src={drinkIcon}
        alt="link para lista de bebidas"
        data-testid="drinks-bottom-btn"
      />
    </Link>
    <Link to="/explorar">
      <img
        src={exploreIcon}
        alt="link para página de exploração"
        data-testid="explore-bottom-btn"
      />
    </Link>
    <Link to="/comidas">
      <img
        src={mealIcon}
        alt="link para lista de comidas"
        data-testid="food-bottom-btn"
      />
    </Link>
  </footer>
);

export default Footer;
