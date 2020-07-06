import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { useFetchDrinkData, useFetchMealsData, GetSixRandomDrinkData } from '../hooks';
import * as requestFunctions from '../services/meals&drinksAPI';

const initialState = {
  id: '',
  choice: 'meal',
};

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mealDetailData, setMealDetailData] = useState([]);
  const [drinkDetailData, setDrinkDetailData] = useState([]);
  const [favorite, setFavorite] = useState();
  const [choice, setChoice] = useState(initialState.choice);

  const fetchMealID = (elem) => {
    requestFunctions.getFoodByID(elem).then(
      (response) => {
        setMealDetailData(response.meals);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchDrinkID = (elem) => {
    requestFunctions.getDrinkByID(elem).then(
      (response) => {
        setDrinkDetailData(response.drinks);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const mealsData = useFetchMealsData();
  const beverageData = useFetchDrinkData();
  const randomDataCall = GetSixRandomDrinkData();

  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    error,
    setError,
    loading,
    setLoading,
    fetchMealID,
    fetchDrinkID,
    mealDetailData,
    setMealDetailData,
    drinkDetailData,
    setDrinkDetailData,
    favorite,
    setFavorite,
    choice,
    setChoice,
    mealsData,
    beverageData,
    randomDataCall,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
