import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { useFetchDrinkData, useFetchMealsData } from '../hooks';
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
  const [basicMealData, setBasicMealData] = useState([]);
  const [basicDrikData, setBasicDrikData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [finished, setFinished] = useState(false);

  const fetchBasicMeal = () => {
    requestFunctions.getFoodList().then(
      (response) => {
        setBasicMealData(response.meals);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchBasicDrink = () => {
    requestFunctions.getDrinkList().then(
      (response) => {
        setBasicDrikData(response.drinks);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

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

  const [foodAreaFilter, setFoodAreaFilter] = useState('All');
  const mealsData = useFetchMealsData();
  const beverageData = useFetchDrinkData();
  // const randomDataCall = GetSixRandomDrinkData();

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
    // randomDataCall,
    basicMealData,
    setBasicMealData,
    basicDrikData,
    setBasicDrikData,
    fetchBasicMeal,
    fetchBasicDrink,
    ingredients,
    setIngredients,
    finished,
    setFinished,
    foodAreaFilter,
    setFoodAreaFilter,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
