import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import InProgress from '../components/InProgress';
import dataDealer from '../helpers/dataDealer';

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

  return (
    <div>
      <InProgress data={dataDrink} />
    </div>
  );
};

export default DrinkInProgressPage;
