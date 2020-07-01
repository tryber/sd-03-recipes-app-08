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
const toogleCategories = (callback, string, value) => (string !== 'All' && string === value ? callback('All') : callback(value));

const renderFoodsInfoContainer = (
  loading,
  error,
  categoriesError,
  categories,
  foodsData,
  categoriesFilter,
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
            onClick={(event) => ((
              toogleCategories(
                setCategoriesFilter,
                categoriesFilter,
                event.target.value,
              ),
              setSearchFilters({ value: '', filter: '' })
            ))}
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
              id={idMeal}
            />
          ),
        )}
      </div>
      <footer className="recipes-footer">
        <Footer />
      </footer>
    </div>
);

const fetchHandlerContainer = (loading, error) => {
  if (loading) return <h1>Loading...</h1>;
  if (!loading && error && <h4 className="data-error-container">{error}</h4>);
  return null;
};

const FoodsGrid = () => {
  const {
    foodsData,
    setFoodsData,
    error,
    setError,
    loading,
    setLoading,
    fetchFoodsData,
    categories,
    setCategories,
    categoriesError,
    setCategoriesError,
    fetchFoodsCategories,
    searchFilters,
    categoriesFilter,
    setCategoriesFilter,
    setSearchFilters,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoading(true);
    fetchFoodsCategories();
    fetchFoodsData();
    return () => {
      setLoading(false);
      setCategories([]);
      setFoodsData([]);
      setError('');
      setCategoriesError('');
    };
  }, [searchFilters, categoriesFilter]);
  return (
    <main>
      {fetchHandlerContainer(loading, error)}
      {renderFoodsInfoContainer(
        loading,
        error,
        categoriesError,
        categories,
        foodsData,
        categoriesFilter,
        setCategoriesFilter,
        setSearchFilters,
      )}
    </main>
  );
};

export default FoodsGrid;
