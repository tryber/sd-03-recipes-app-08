import React, { useEffect, useState } from 'react';
import Clipboard from '../components/Clipboard';
import BlackHeart from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import '../styles/RecipeDetails.css';

let favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));

const filterFavorite = (text, setFavoriteList) => {
  const refreshFavoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (text === 'comida') {
    const newFavoriteList = refreshFavoriteList.filter((elem) => elem.type === text);
    setFavoriteList(newFavoriteList);
    return;
  }
  if (text === 'bebida') {
    const newFavoriteList = refreshFavoriteList.filter((elem) => elem.type === text);
    setFavoriteList(newFavoriteList);
    return;
  }
  setFavoriteList(refreshFavoriteList);
};

const removeFavorite = (data, setFavoriteList) => {
  favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipesArr = favoriteRecipesArr.filter((elem) => elem.name !== data.name);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  filterFavorite(data.type, setFavoriteList);
};

const renderExcludeFavorite = (data, index, setFavoriteList) => (
  <button
    type="button"
    onClick={() => removeFavorite(data, setFavoriteList)}
    className="favorite-btn"
  >
    <img
      alt="black-heart"
      src={BlackHeart}
      data-testid={`${index}-horizontal-favorite-btn`}
    />
  </button>
);

const renderConteinerFavorite = (data, index, setFavoriteList) => {
  const choice = (data.type === 'comida') ? 'meal' : 'drink';
  return (
    <div className="favorite-conteiner">
      <img
        data-testid={`${index}-horizontal-image`}
        src={data.image}
        alt="recipe"
        className="recipe-photo"
      />
      <div className="details-header-text">
        <h1 data-testid={`${index}-horizontal-name`} className="horizontal-name">
          {data.name}
        </h1>
        <h4 data-testid={`${index}-horizontal-top-text`} className="horizontal-top-text">
          {(data.type === 'comida') ? `${data.area} - ${data.category}` : data.alcoholicOrNot}
        </h4>
      </div>
      <div>
        <Clipboard id={data.id} choice={choice} index={index} />
        {renderExcludeFavorite(data, index, setFavoriteList)}
      </div>
    </div>
  );
};

const renderDetailsPage = (data, setFavoriteList) => (
  <div className="favorite-page">
    <button
      type="button"
      data-testid="filter-by-all-btn"
      className="filter-by-all-btn"
      onClick={() => filterFavorite('', setFavoriteList)}
    >
      All
    </button>
    <button
      type="button"
      data-testid="filter-by-food-btn"
      className="filter-by-food-btn"
      onClick={() => filterFavorite('comida', setFavoriteList)}
    >
      Food
    </button>
    <button
      type="button"
      data-testid="filter-by-drink-btn"
      className="filter-by-drink-btn"
      onClick={() => filterFavorite('bebida', setFavoriteList)}
    >
      Drinks
    </button>
    {data.map((elem, index) => (renderConteinerFavorite(elem, index, setFavoriteList)))}
  </div>
);

const FavoritePage = () => {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setFavoriteList(favoriteRecipesArr);
  }, []);

  return (
    <div className="recipe-details-page">
      <Header iconProfile={profileIcon} title="Receitas Favoritas" />
      {renderDetailsPage(favoriteList, setFavoriteList)}
      <Footer />
    </div>
  );
};

export default FavoritePage;
