import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import RecipeDetails from '../components/RecipeDetails';

const MealDetailPage = () => {
  const {
    fetchMealID, choice, setChoice, fetchBasicDrink,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setChoice('meal');
    fetchMealID(id);
    fetchBasicDrink();
  }, [choice]);

  return (
    <div>
      <RecipeDetails />
    </div>
  );
};

export default MealDetailPage;
