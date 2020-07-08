import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../context';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import '../styles/RecipeDetails.css';

const favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));

const handleFavorite = (data, favorite, setFavorite) => {
  const revisedFavoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favorite) {
    const newFavoriteRecipesArr = revisedFavoriteRecipesArr.filter((elem) => elem.id !== data.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  } else {
    const dataToFavoriteRecipe = {
      id: data.id,
      type: data.type,
      area: data.area,
      category: data.category,
      alcoholicOrNot: data.alcoholicOrNot,
      name: data.name,
      image: data.image,
    };
    const newFavoriteRecipesArr = (favoriteRecipesArr)
      ? [...favoriteRecipesArr, dataToFavoriteRecipe]
      : [dataToFavoriteRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  }
  setFavorite(!favorite);
};

const renderFavorite = (data, favorite, setFavorite) => {
  if (favorite) {
    return (
      <button
        type="button"
        onClick={() => handleFavorite(data, favorite, setFavorite)}
        className="favorite-btn"
      >
        <img
          alt="black-heart"
          src={BlackHeart}
          data-testid="favorite-btn"
        />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => handleFavorite(data, favorite, setFavorite)}
    >
      <img
        alt="white-heart"
        src={WhiteHeart}
        data-testid="favorite-btn"
        className="favorite-btn"
      />
    </button>
  );
};

const FavoriteButton = ({ data }) => {
  const { choice, favorite, setFavorite } = useContext(RecipeAppContext);
  const { id } = useParams();
  let favoriteArr1 = [{ id: 'nothing' }];
  if (favoriteRecipesArr) {
    favoriteArr1 = favoriteRecipesArr;
  }
  useEffect(() => {
    setFavorite(favoriteArr1.some((elem) => elem.id === id));
  }, [choice]);
  return (
    <div>
      {renderFavorite(data, favorite, setFavorite)}
    </div>
  );
};

export default FavoriteButton;

FavoriteButton.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.string,
    video: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
