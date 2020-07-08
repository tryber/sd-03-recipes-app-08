import React, { useContext, useEffect } from 'react';
import { RecipeAppContext } from '../context';
import FetchHandlerContainer from '../components/FetchHandlerContainer';
import useFoodByArea from '../hooks/useFoodByArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import AreasDropdown from '../components/AreasDropdown';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { maximumRecipeGrid } from '../helpers/dataHandlers';
import '../styles/RecipesPage.css';

const recipesByAreaConteiner = (
  title,
  searchFilters,
  foodAreas,
  foodAreasError,
  data,
) => (
  <section>
    <div className="recipes-header">
      <Header
        iconProfile={profileIcon}
        iconSearch={searchIcon}
        title={title}
        searchFilters={searchFilters}
      />
    </div>
    <section>
      <div className="filter-buttons-container">
        <AreasDropdown foodAreas={foodAreas} foodAreasError={foodAreasError} />
      </div>
      <div className="recipes-card-grid">
        {maximumRecipeGrid(data).map(
          ({ idMeal, strMeal, strMealThumb }, index) => (
            <RecipeCard
              key={idMeal}
              thumbnail={strMealThumb}
              name={strMeal}
              index={index}
              id={idMeal}
              path="/comidas"
            />
          ),
        )}
      </div>
    </section>
    <div className="recipes-footer">
      <Footer />
    </div>
  </section>
);

const title = 'Explorar Origem';

function RecipesByAreaGrid() {
  const {
    foodAreaFilter,
    setSearchFilters,
    searchFilters,
    setFoodAreaFilter,
  } = useContext(RecipeAppContext);
  const {
    loading, error, data, foodAreas, foodAreasError,
  } = useFoodByArea(
    foodAreaFilter,
    searchFilters,
  );

  useEffect(() => () => {
    setFoodAreaFilter('');
    setSearchFilters(() => ({ ...searchFilters, filter: '', value: '' }));
  }, []);

  return (
    <main className="recipes-page">
      <FetchHandlerContainer loading={loading} error={error} />
      {!loading
        && !error
        && recipesByAreaConteiner(
          title,
          setSearchFilters,
          foodAreas,
          foodAreasError,
          data,
        )}
    </main>
  );
}

export default RecipesByAreaGrid;
