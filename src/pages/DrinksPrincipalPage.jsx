import React, { useContext } from 'react';
import { RecipeAppContext } from '../context';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import RecipesContainer from '../components/RecipesContainer';
import {
  maximumRecipeGrid,
  maximumCategoriesGrid,
  toogleCategories,
} from '../helpers/dataHandlers';
import '../styles/DrinksPrincipalPage.css';

const DrinksGrid = () => {
  const {
    beverageData: {
      data: drinksData,
      categories,
      categoriesError,
      error,
      loading,
    },
    categoriesFilter,
    setCategoriesFilter,
    setSearchFilters,
  } = useContext(RecipeAppContext);

  return (
    <main>
      <FetchHandlerContainer loading={loading} error={error} />
      <RecipesContainer
        loading={loading}
        error={error}
        categories={categories}
        categoriesError={categoriesError}
        data={drinksData}
        onClick={(event) => ((
          toogleCategories(
            setCategoriesFilter,
            categoriesFilter,
            event.target.value,
          ),
          setSearchFilters({ value: '', filter: '' })
        ))}
        maximumCategoriesGrid={maximumCategoriesGrid}
        maximumRecipeGrid={maximumRecipeGrid}
        path="bebidas"
        title="Bebidas"
      />
    </main>
  );
};

export default DrinksGrid;
