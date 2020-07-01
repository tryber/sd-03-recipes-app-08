import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import RecipeCard from './RecipeCard';
import CategoriesButtonsGrid from './CategoriesButtonsGrid';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/DrinksPrincipalPage.css';

function RecipesContainer({
  loading,
  error,
  categories,
  categoriesError,
  data,
  onClick,
  maximumCategoriesGrid,
  maximumDrinkGrid,
}) {
  return (
    !loading
    && !error && (
      <div className="recipes-page">
        <header className="recipes-header">
          <Header
            iconProfile={profileIcon}
            iconSearch={searchIcon}
            title="Bebidas"
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
          {maximumDrinkGrid(data).map(
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
  error: '',
  categoriesError: '',
  categories: [],
  data: [],
};

RecipesContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  categoriesError: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func.isRequired,
  maximumCategoriesGrid: PropTypes.func.isRequired,
  maximumDrinkGrid: PropTypes.func.isRequired,
};

export default RecipesContainer;
