import React, { useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksCard from '../components/DrinkCard';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoriesButtonsGrid from '../components/CategoriesButtonsGrid';
import '../styles/DrinksPrincipalPage.css';

const maximumDrinkGrid = (data) => data.slice(0, 12);
const maximumCategoriesGrid = (data) => data.slice(0, 5);

const toogleCategories = (callback, string, value) => {
  return string === 'All' ? callback(value) : callback('All');
};

const renderDrinksInfoContainer = (
  loading,
  error,
  categoriesError,
  categories,
  drinksData,
  categoriesFilter,
  setCategoriesFilter,
  setSearchFilters,
) =>
  !loading &&
  !error && (
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
            onClick={(event) => ((
              toogleCategories(setCategoriesFilter, categoriesFilter, event.target.value),
              setSearchFilters({ value: '', filter: '' })
            ))}
          />
        </div>
      )}
      <div className="recipes-card-grid">
        {maximumDrinkGrid(drinksData).map(
          ({ idDrink, strDrink, strDrinkThumb }, index) => (
            <DrinksCard
              key={idDrink}
              thumbnail={strDrinkThumb}
              name={strDrink}
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

const DrinksGrid = () => {
  const {
    drinksData,
    setDrinksData,
    error,
    setError,
    loading,
    setLoading,
    fetchDrinksData,
    categories,
    setCategories,
    categoriesError,
    setCategoriesError,
    fetchDrinksCategories,
    searchFilters,
    categoriesFilter,
    setCategoriesFilter,
    setSearchFilters,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoading(true);
    fetchDrinksCategories();
    fetchDrinksData();
    return () => {
      setLoading(false);
      setCategories([]);
      setDrinksData([]);
      setError('');
      setCategoriesError('');
    };
  }, [searchFilters, categoriesFilter]);
  return (
    <main>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h4 className="data-error-container">{error}</h4>}
      {renderDrinksInfoContainer(
        loading,
        error,
        categoriesError,
        categories,
        drinksData,
        categoriesFilter,
        setCategoriesFilter,
        setSearchFilters,
      )}
    </main>
  );
};

export default DrinksGrid;
