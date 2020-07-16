import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import FavoriteAndDoneBody from '../components/FavoriteAndDoneBody';
import '../styles/RecipeDetails.css';
import { RecipeAppContext } from '../context';

let favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));

const FavoritePage = () => {
  const {
    setList,
  } = useContext(RecipeAppContext);
  useEffect(() => {
    favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setList(favoriteRecipesArr);
  }, [setList]);

  return (
    <div className="favorite-done-page">
      <Header iconProfile={profileIcon} title="Receitas Favoritas" />
      <FavoriteAndDoneBody comand="favorite" />
    </div>
  );
};

export default FavoritePage;
