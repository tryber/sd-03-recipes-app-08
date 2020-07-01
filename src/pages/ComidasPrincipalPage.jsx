import React, { useContext } from 'react';
import { RecipeAppContext } from '../context';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import RecipesContainer from '../components/RecipesContainer';
import '../styles/DrinksPrincipalPage.css';

const maximumFoodGrid = (data) => data.slice(0, 12);
const maximumCategoriesGrid = (data) => data.slice(0, 5);
const toogleCategories = (callback, string, value) => (string !== 'All' && string === value ? callback('All') : callback(value));

const FoodsGrid = () => {
  const {
    mealsData: {
      data: foodsData,
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
        data={foodsData}
        onClick={(event) => ((
          toogleCategories(
            setCategoriesFilter,
            categoriesFilter,
            event.target.value,
          ),
          setSearchFilters({ value: '', filter: '' })
        ))}
        maximumCategoriesGrid={maximumCategoriesGrid}
        maximumDrinkGrid={maximumFoodGrid}
      />
    </main>
  );
};

export default FoodsGrid;
