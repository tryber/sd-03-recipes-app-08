import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import RecipeDetails from '../components/RecipeDetails';

const MealDetailPage = () => {
  const {
    fetchMealID, choice, setChoice, fetchBasicDrink, setLoading, mealDetailData,
  } = useContext(
    RecipeAppContext,
  );
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    setChoice('meal');
    fetchMealID(id);
    fetchBasicDrink();
  }, [choice]);

  if (mealDetailData.length === 0) return <h1>Loading...</h1>;

  return <RecipeDetails />;
};

export default MealDetailPage;
