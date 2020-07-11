import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Clipboard from './Clipboard';
import BlackHeart from '../images/blackHeartIcon.svg';
import Header from './Header';
import Footer from './Footer';
import profileIcon from '../images/profileIcon.svg';
import '../styles/RecipeDetails.css';
import { RecipeAppContext } from '../context';

let favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));

const filterLocalStore = (text, setList, refreshList) => {
  if (text === 'comida') {
    const newList = refreshList.filter((elem) => elem.type === text);
    setList(newList);
    return;
  }
  if (text === 'bebida') {
    const newList = refreshList.filter((elem) => elem.type === text);
    setList(newList);
    return;
  }
  setList(refreshList);
};

const defineFilter = (text, setList, comand) => {
  if (comand === 'favorite') {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    filterLocalStore(text, setList, favoriteList);
    return;
  }
  const doneList = JSON.parse(localStorage.getItem('doneRecipes'));
  filterLocalStore(text, setList, doneList);
};

const removeFavorite = (data, setList) => {
  favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipesArr = favoriteRecipesArr.filter((elem) => elem.name !== data.name);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  defineFilter(data.type, setList, 'favorite');
};

const renderExcludeFavorite = (data, index, setList) => (
  <button
    type="button"
    onClick={() => removeFavorite(data, setList)}
    className="favorite-btn"
  >
    <img
      alt="black-heart"
      src={BlackHeart}
      data-testid={`${index}-horizontal-favorite-btn`}
    />
  </button>
);

const renderFinishData = (data, index) => (
  <h4 data-testid={`${index}-horizontal-done-date`}>{data.doneDate}</h4>
);

const renderTags = (tags, index) => {
  if (tags[1]) {
    return (
      <div>
        <h4 data-testid={`${index}-${tags[0]}-horizontal-tag`}>{tags[0]}</h4>
        <h4 data-testid={`${index}-${tags[1]}-horizontal-tag`}>{tags[1]}</h4> 
      </div>
    );
  }
  return (
    <div>
      <h4>{tags[0]}</h4>
    </div>
  );
};

const renderConteinerFavorite = (data, index, setList, comand) => {
  const choice = (data.type === 'comida') ? 'meal' : 'drink';
  console.log(data.tags);
  return (
    <div className="favorite-conteiner">
      <Link to={`${data.type}s/${data.id}`}>
        <img
          data-testid={`${index}-horizontal-image`}
          src={data.image}
          alt="recipe"
          className="recipe-photo"
        />
      </Link>
      <div className="details-header-text">
        <Link to={`${data.type}s/${data.id}`}>
          <h1 data-testid={`${index}-horizontal-name`} className="horizontal-name">
            {data.name}
          </h1>
        </Link>
        <h4 data-testid={`${index}-horizontal-top-text`} className="horizontal-top-text">
          {(data.type === 'comida') ? `${data.area} - ${data.category}` : data.alcoholicOrNot}
        </h4>
      </div>
      <div>
        <Clipboard id={data.id} choice={choice} index={index} />
        {(comand === 'favorite')
          ? renderExcludeFavorite(data, index, setList)
          : renderFinishData(data, index)}
        {(data.tags) ? renderTags(data.tags, index) : null}
      </div>
    </div>
  );
};

const renderDetailsPage = (data, setList, comand) => (
  <div className="favorite-page">
    <button
      type="button"
      data-testid="filter-by-all-btn"
      className="filter-by-all-btn"
      onClick={() => defineFilter('', setList, comand)}
    >
      All
    </button>
    <button
      type="button"
      data-testid="filter-by-food-btn"
      className="filter-by-food-btn"
      onClick={() => defineFilter('comida', setList, comand)}
    >
      Food
    </button>
    <button
      type="button"
      data-testid="filter-by-drink-btn"
      className="filter-by-drink-btn"
      onClick={() => defineFilter('bebida', setList, comand)}
    >
      Drinks
    </button>
    {data.map((elem, index) => (renderConteinerFavorite(elem, index, setList, comand)))}
  </div>
);

const FavoriteAndDoneBody = ({ comand }) => {
  const {
    list, setList,
  } = useContext(RecipeAppContext);

  return (
    <div className="recipe-details-page">
      <Header iconProfile={profileIcon} title="Receitas Favoritas" />
      {renderDetailsPage(list, setList, comand)}
      <Footer />
    </div>
  );
};

export default FavoriteAndDoneBody;

FavoriteAndDoneBody.propTypes = {
  comand: PropTypes.string.isRequired,
};