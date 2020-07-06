import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import profileIcon from '../images/profileIcon.svg';
import '../styles/RecipesPage.css';
import {
  fetchFoodIngredients,
  fetchDrinkIngredients,
} from '../services/fetchHandlers';
import { maximumRecipeGrid } from '../helpers/dataHandlers';

const ingredientSwitch = (
  location,
  setIngredientsList,
  setIngredientsListError,
) => (location.pathname.includes('/explorar/comidas/ingredientes')
  ? fetchFoodIngredients(setIngredientsList, setIngredientsListError)
  : fetchDrinkIngredients(setIngredientsList, setIngredientsListError));

const pathSwitch = (location) => (location.pathname.includes('/explorar/comidas/ingredientes')
  ? '/comidas'
  : '/bebidas');

function ExploreByIngredients() {
  const location = useLocation();
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsListError, setIngredientsListError] = useState('');

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
          maximumRecipeGrid(
            ingredientsList,
          ).map(({ idIngredient, strIngredient, strIngredient1 }, index) => (
            <IngredientCard
              key={idIngredient || strIngredient1}
              thumbnail={strIngredient || strIngredient1}
              name={strIngredient || strIngredient1}
              index={index}
              path={pathSwitch(location)}
            />
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
