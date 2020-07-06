import React, { useState, UseEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';
import '../styles/RecipesPage.css';
import {
  fetchFoodIngredients,
  fetchDrinkIngredients,
} from '../services/meals&drinksAPI';
import { maximumRecipeGrid } from '../helpers/dataHandlers';
import IngredientCard from '../components/IngredientCard';

const ingredientSwitch = (
  location,
  setIngredientsList,
  setIngredientsListError,
) =>
  location.pathname.includes('/explorar/comidas/ingredientes')
    ? fetchFoodIngredients(setIngredientsList, setIngredientsListError)
    : fetchDrinkIngredients(setIngredientsList, setIngredientsListError);

function ExploreByIngredients() {
  const location = useLocation();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsListError, setIngredientsListError] = useState([]);
  useEffect(() => {
    ingredientSwitch(location, setIngredientsList, setIngredientsListError);
    return () => {
      setIngredientsList([]);
      setIngredientsListError('');
    };
  }, [location]);
  return (
    <main className="recipes-page">
      <div className="recipes-header">
        <Header iconProfile={profileIcon} title="Explorar Ingredientes" />
      </div>
      <div className="recipes-card-grid">
        {ingredientsListError ? (
          <h3>{ingredientsListError}</h3>
        ) : (
          maximumRecipeGrid(ingredientsList).map((ingredient) => (
            <IngredientCard />
          ))
        )}
      </div>
      <div className="recipes-footer">
        <Footer />
      </div>
    </main>
  );
}

export default ExploreByIngredients;
