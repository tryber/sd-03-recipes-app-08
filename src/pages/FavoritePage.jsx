import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  }, []);
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) return <h1>Loading...</h1>;
  return (
    <div className="recipe-details-page">
      <Header iconProfile={profileIcon} title="Receitas Favoritas" />
      <FavoriteAndDoneBody comand="favorite" />
      <Footer />
    </div>
  );
};

export default FavoritePage;
