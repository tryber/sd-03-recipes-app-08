import React, { useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodsCard from '../components/FoodCard';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoriesButtonsGrid from '../components/CategoriesButtonsGrid';
import '../styles/DrinksPrincipalPage.css';

const maximumFoodGrid = (data) => data.slice(0, 12);
const maximumCategoriesGrid = (data) => data.slice(0, 5);

const renderFoodsInfoContainer = (
  loading,
  error,
  categoriesError,
  categories,
  foodsData,
  setCategoriesFilter,
  setSearchFilters,
) => !loading
  && !error && (
    <div className="recipes-page">
      <header className="recipes-header">
        <Header
          iconProfile={profileIcon}
          iconSearch={searchIcon}
          title="Comidas"
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
            onClick={
              ((event) => ((setCategoriesFilter(event.target.value),
              setSearchFilters({ value: '', filter: '' }))))
            }
          />
        </div>
      )}
      <div className="recipes-card-grid">
        {maximumFoodGrid(foodsData).map(
          ({ idMeal, strMeal, strMealThumb }, index) => (
            <FoodsCard
              key={idMeal}
              thumbnail={strMealThumb}
              name={strMeal}
              index={index}
            />
          ),
        )}
      </div>
      <footer className="recipes-footer">
        <Footer />
      </footer>
    </div>
);

const FoodsGrid = () => {
  const {
    foodsData,
    setFoodsData,
    errorFood,
    setErrorFood,
    loadingFood,
    setLoadingFood,
    fetchFoodsData,
    categoriesFood,
    setCategoriesFood,
    categoriesErrorFood,
    setCategoriesErrorFood,
    fetchFoodsCategories,
    searchFiltersFood,
    categoriesFilterFood,
    setCategoriesFilterFood,
    setSearchFiltersFood,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoadingFood(true);
    fetchFoodsCategories();
    fetchFoodsData();
    return () => {
      setLoadingFood(false);
      setCategoriesFood([]);
      setFoodsData([]);
      setErrorFood('');
      setCategoriesErrorFood('');
    };
  }, [searchFiltersFood, categoriesFilterFood]);
  return (
    <main>
      {loadingFood && <h1>Loading...</h1>}
      {!loadingFood && errorFood && <h4 className="data-error-container">{errorFood}</h4>}
      {renderFoodsInfoContainer(
        loadingFood,
        errorFood,
        categoriesErrorFood,
        categoriesFood,
        foodsData,
        setCategoriesFilterFood,
        setSearchFiltersFood,
      )}
    </main>
  );
};

export default FoodsGrid;
