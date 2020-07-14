import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import FavoriteAndDoneBody from '../components/FavoriteAndDoneBody';
import '../styles/RecipeDetails.css';
import { RecipeAppContext } from '../context';

let doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));

const FavoritePage = () => {
  const {
    setList,
  } = useContext(RecipeAppContext);
  useEffect(() => {
    doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));
    setList(doneRecipesArr);
  }, []);

  if (!doneRecipesArr) return <h1>Loading...</h1>;

  return (
    <div className="recipe-done-page">
      <Header iconProfile={profileIcon} title="Receitas Feitas" />
      <FavoriteAndDoneBody comand="done" />
      <Footer />
    </div>
  );
};

export default FavoritePage;
