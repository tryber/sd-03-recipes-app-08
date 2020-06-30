import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from './context';
import { getDrinksCategoriesList, getFoodsCategoriesList } from '../services/meals&drinksAPI';
import { requestDrinksData, requestFoodsData } from '../services/requestData';

const RecipeAppProvider = ({ children }) => {
  const [mealsToken, setMealsToken] = useState(1);
  const [cocktailsToken, setCocktailsToken] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingFood, setLoadingFood] = useState(false);
  const [searchFilters, setSearchFilters] = useState({ value: '', filter: '' });
  const [searchFiltersFood, setSearchFiltersFood] = useState({ value: '', filter: '' });
  const [categoriesFilter, setCategoriesFilter] = useState('All');
  const [categoriesFilterFood, setCategoriesFilterFood] = useState('All');
  const [drinksData, setDrinksData] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [error, setError] = useState('');
  const [errorFood, setErrorFood] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  const [categoriesErrorFood, setCategoriesErrorFood] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);

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
    requestFoodsData(categoriesFilterFood, searchFiltersFood).then(
      (response) => {
        setFoodsData(response.meals);
        setLoadingFood(false);
      },
      (response) => {
        setErrorFood(response.message);
        setLoadingFood(false);
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
        setCategoriesFood(response.meals);
        setLoadingFood(false);
      },
      (response) => {
        setCategoriesErrorFood(response.message);
        setLoadingFood(false);
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
    errorFood,
    setError,
    loading,
    loadingFood,
    setLoading,
    setLoadingFood,
    searchFilters,
    searchFiltersFood,
    setSearchFilters,
    setSearchFiltersFood,
    fetchDrinksData,
    fetchFoodsData,
    categories,
    categoriesFood,
    setCategories,
    setCategoriesFood,
    categoriesError,
    categoriesErrorFood,
    setCategoriesError,
    setCategoriesErrorFood,
    fetchDrinksCategories,
    fetchFoodsCategories,
    categoriesFilter,
    categoriesFilterFood,
    setCategoriesFilter,
    setCategoriesFilterFood,
  };

  return (
    <RecipeAppContext.Provider value={context}>
      {children}
    </RecipeAppContext.Provider>
  );
};

RecipeAppProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipeAppProvider;
