import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { getDrinksCategoriesList, getFoodsCategoriesList } from '../services/meals&drinksAPI';
import { requestDrinksData, requestFoodsData } from '../services/requestData';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ filter: '', value: '' });
  const [categoriesFilter, setCategoriesFilter] = useState('All');
  const [drinksData, setDrinksData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchDrinksData = () => {
    requestDrinksData(categoriesFilter, searchFilters).then(
      (response) => {
        setDrinksData(response.drinks);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchFoodsData = () => {
    requestFoodsData(categoriesFilter, searchFilters).then(
      (response) => {
        setFoodsData(response.meals);
        setLoading(false);
      },
      (response) => {
        setError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchDrinksCategories = () => {
    getDrinksCategoriesList().then(
      (response) => {
        setCategories(response.drinks);
        setLoading(false);
      },
      (response) => {
        setCategoriesError(response.message);
        setLoading(false);
      },
    );
  };

  const fetchFoodsCategories = () => {
    getFoodsCategoriesList().then(
      (response) => {
        setCategories(response.meals);
        setLoading(false);
      },
      (response) => {
        setCategoriesError(response.message);
        setLoading(false);
      },
    );
  };
  const context = {
    mealsToken,
    cocktailsToken,
    setMealsToken,
    setCocktailsToken,
    drinksData,
    setDrinksData,
    foodsData,
    setFoodsData,
    error,
    setError,
    loading,
    setLoading,
    searchFilters,
    setSearchFilters,
    fetchDrinksData,
    fetchFoodsData,
    categories,
    setCategories,
    categoriesError,
    setCategoriesError,
    fetchDrinksCategories,
    fetchFoodsCategories,
    categoriesFilter,
    setCategoriesFilter,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
