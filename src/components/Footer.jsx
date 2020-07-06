import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

const Footer = () => {
  const { setChoice } = useContext(RecipeAppContext);
  return (
    <footer data-testid="footer" className="recipes-footer">
      <Link to="/bebidas">
        <input
          type="image"
          src={drinkIcon}
          alt="link para lista de bebidas"
          className="drinks-icon"
          data-testid="drinks-bottom-btn"
          onClick={() => setChoice('drink')}
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
        <input
          type="image"
          src={mealIcon}
          alt="link para lista de comidas"
          className="food-icon"
          data-testid="food-bottom-btn"
          onClick={() => setChoice('meal')}
        />
      </Link>
    </footer>
  );
};

export default Footer;
