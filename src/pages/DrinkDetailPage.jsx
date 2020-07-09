import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import RecipeDetails from '../components/RecipeDetails';

const DrinkDetailPage = () => {
  const {
    fetchDrinkID, choice, setChoice, fetchBasicMeal, setLoading, drinkDetailData,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    setChoice('drink');
    fetchDrinkID(id);
    fetchBasicMeal();
  }, [choice]);

  if (drinkDetailData.length === 0) return <h1>Loading...</h1>;

  return (
    <div>
      <RecipeDetails />
    </div>
  );
};

export default DrinkDetailPage;
