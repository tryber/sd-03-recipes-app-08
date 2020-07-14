import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import FavoriteAndDoneBody from '../components/FavoriteAndDoneBody';
import '../styles/RecipeDetails.css';
import { RecipeAppContext } from '../context';

const favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));

const FavoritePage = () => {
  const {
    setList,
  } = useContext(RecipeAppContext);
  useEffect(() => {
    setList(favoriteRecipesArr);
  }, []);
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) return <h1>Loading...</h1>;
  return (
    <div className="favorite-done-page">
      <Header iconProfile={profileIcon} title="Receitas Favoritas" />
      <FavoriteAndDoneBody comand="favorite" />
    </div>
  );
};

export default FavoritePage;
