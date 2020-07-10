import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import InProgress from '../components/InProgress';
import dataDealer from '../helpers/dataDealer';

let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };
localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

function initialProgress(id) {
  const startProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!startProgress.meals[id]) {
    startProgress.meals[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(startProgress));
  }
}

const MealInProgressPage = () => {
  const {
    fetchMealID, choice, setChoice, setLoading, mealDetailData,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    setChoice('meal');
    fetchMealID(id);
  }, [choice]);

  if (!mealDetailData || mealDetailData.length === 0) return <h1>Loading...</h1>;

  const dataMeal = dataDealer(choice, mealDetailData);
  inProgressRecipes = initialProgress(dataMeal.id);

  return (
    <div>
      <InProgress data={dataMeal} />
    </div>
  );
};

export default MealInProgressPage;
