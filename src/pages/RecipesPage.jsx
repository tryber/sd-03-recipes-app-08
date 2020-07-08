import React, { useContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import { useBeverageOrMealsContext } from '../hooks';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import RecipesContainer from '../components/RecipesContainer';
import {
  maximumRecipeGrid,
  maximumCategoriesGrid,
  toogleCategories,
  noDataAlert,
  createTitle,
} from '../helpers/dataHandlers';
import '../styles/RecipesPage.css';

const uniqueRecipe = (data, location) => {
  const URL = location.pathname;
  if (URL === '/comidas') return <Redirect to={`${URL}/${data[0].idMeal}`} />;
  return <Redirect to={`${URL}/${data[0].idDrink}`} />;
};

const RecipesGrid = () => {
  const location = useLocation();
  const recipes = useBeverageOrMealsContext(location);
  const { searchFilters, setSearchFilters } = useContext(RecipeAppContext);

  useEffect(() => {
    setSearchFilters(() => ({ ...searchFilters, filter: '', value: '' }));
    return () => {
      setSearchFilters(() => ({ ...searchFilters, filter: '', value: '' }));
    };
  }, [location]);

  if (recipes.data && recipes.data.length === 1 && searchFilters.value !== '') return uniqueRecipe(recipes.data, location);
  return (
    <main>
      <FetchHandlerContainer loading={recipes.loading} error={recipes.error} />
      {recipes.data ? (
        <RecipesContainer
          loading={recipes.loading}
          error={recipes.error}
          categories={recipes.categories}
          categoriesError={recipes.categoriesError}
          data={recipes.data}
          onClick={(event) => (
            toogleCategories(
              recipes.setCategoriesFilter,
              recipes.categoriesFilter,
              event.target.value,
            ),
            setSearchFilters({ value: '', filter: '' })
          )}
          maximumCategoriesGrid={maximumCategoriesGrid}
          maximumRecipeGrid={maximumRecipeGrid}
          path={location.pathname}
          title={createTitle(location)}
          searchFilters={setSearchFilters}
        />
      ) : (
        noDataAlert()
      )}
    </main>
  );
};

export default RecipesGrid;
