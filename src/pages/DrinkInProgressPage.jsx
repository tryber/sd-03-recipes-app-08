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
  if (!startProgress.cocktails[id]) {
    startProgress.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(startProgress));
  }
}

const DrinkInProgressPage = () => {
  const {
    setLoading, fetchDrinkID, choice, setChoice, drinkDetailData,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    setChoice('drink');
    fetchDrinkID(id);
  }, [choice]);

  if (!drinkDetailData || drinkDetailData.length === 0) return <h1>Loading...</h1>;

  const dataDrink = dataDealer(choice, drinkDetailData);
  inProgressRecipes = initialProgress(dataDrink.id);

  return (
    <div>
      <InProgress data={dataDrink} />
    </div>
  );
};

export default DrinkInProgressPage;
