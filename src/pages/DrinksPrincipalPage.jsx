import React, { useContext } from 'react';
import { RecipeAppContext } from '../context';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import RecipesContainer from '../components/RecipesContainer';
import '../styles/DrinksPrincipalPage.css';

const maximumDrinkGrid = (data) => data.slice(0, 12);
const maximumCategoriesGrid = (data) => data.slice(0, 5);
const toogleCategories = (callback, string, value) => (string !== 'All' && string === value ? callback('All') : callback(value));

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
        onClick={((event) => ((
          toogleCategories(
            setCategoriesFilter,
            categoriesFilter,
            event.target.value,
          ),
          setSearchFilters({ value: '', filter: '' })
        )))}
        maximumCategoriesGrid={maximumCategoriesGrid}
        maximumDrinkGrid={maximumDrinkGrid}
      />
    </main>
  );
};

export default DrinksGrid;
