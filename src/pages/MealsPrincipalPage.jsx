import React, { useContext } from 'react';
import { RecipeAppContext } from '../context';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import RecipesContainer from '../components/RecipesContainer';
import {
  maximumRecipeGrid,
  maximumCategoriesGrid,
  toogleCategories,
  noDataAlert,
} from '../helpers/dataHandlers';
import '../styles/DrinksPrincipalPage.css';

const MealsGrid = () => {
  const {
    mealsData: {
      data,
      categories,
      categoriesError,
      error,
      loading,
      setSearchFilters,
      categoriesFilter,
      setCategoriesFilter,
      filters,
      setFilters,
    },
  } = useContext(RecipeAppContext);

  return (
    <main>
      <FetchHandlerContainer loading={loading} error={error} />
      {data !== null ? (
        <RecipesContainer
          loading={loading}
          error={error}
          categories={categories}
          categoriesError={categoriesError}
          data={data}
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
          path="comidas"
          title="Comidas"
          searchFilters={setSearchFilters}
          filters={filters}
          setFilters={setFilters}
        />
      ) : (
        noDataAlert()
      )}
    </main>
  );
};

export default MealsGrid;
