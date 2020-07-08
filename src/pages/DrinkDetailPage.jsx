import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import RecipeDetails from '../components/RecipeDetails';

const DrinkDetailPage = () => {
  const {
    fetchDrinkID, choice, setChoice, fetchBasicMeal,
  } = useContext(
    RecipeAppContext,
  );
  const { id } = useParams();
  useEffect(() => {
    setChoice('drink');
    fetchDrinkID(id);
    fetchBasicMeal();
  }, [choice]);

  return <RecipeDetails />;
};

export default DrinkDetailPage;
