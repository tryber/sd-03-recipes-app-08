import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
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

const DrinksGrid = () => {
  const {
    beverageData: {
      data,
      categories,
      categoriesError,
      error,
      loading,
      searchFilters,
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
          path="bebidas"
          title="Bebidas"
          searchFilters={setSearchFilters}
          filters={filters}
          setFilters={setFilters}
        />
      ) : (
        noDataAlert()
      )}
      {data.length === 1 && searchFilters.value !== '' && <Redirect to={`/bebidas/${data[0].idDrink}`} />}
    </main>
  );
};

export default DrinksGrid;
