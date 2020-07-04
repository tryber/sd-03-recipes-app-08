import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import CategoriesButtonsGrid from './CategoriesButtonsGrid';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/RecipesPage.css';

function RecipesContainer({
  loading,
  error,
  categories,
  categoriesError,
  data,
  onClick,
  maximumCategoriesGrid,
  maximumRecipeGrid,
  path,
  title,
  searchFilters,
}) {
  return (
    !loading
    && !error && data && (
      <div className="recipes-page">
        <header className="recipes-header">
          <Header
            iconProfile={profileIcon}
            iconSearch={searchIcon}
            title={title}
            searchFilters={searchFilters}
          />
        </header>
        {!loading && categoriesError ? (
          <div className="error-container">
            <h4>{categoriesError}</h4>
          </div>
        ) : (
          <div className="filter-buttons-container">
            <CategoriesButtonsGrid
              data={maximumCategoriesGrid(categories)}
              onClick={onClick}
            />
          </div>
        )}
        <div className="recipes-card-grid">
          {maximumRecipeGrid(data).map(
            (
              {
                idDrink,
                strDrink,
                strDrinkThumb,
                idMeal,
                strMeal,
                strMealThumb,
              },
              index,
            ) => (
              <RecipeCard
                key={idDrink || idMeal}
                thumbnail={strDrinkThumb || strMealThumb}
                name={strDrink || strMeal}
                index={index}
                id={idDrink || idMeal}
                path={path}
              />
            ),
          )}
        </div>
        <footer className="recipes-footer">
          <Footer />
        </footer>
      </div>
    )
  );
}

RecipesContainer.defaultProps = {
  categories: [],
  categoriesError: '',
  data: [],
  error: '',
};

RecipesContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoriesError: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  maximumCategoriesGrid: PropTypes.func.isRequired,
  maximumRecipeGrid: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  searchFilters: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecipesContainer;
