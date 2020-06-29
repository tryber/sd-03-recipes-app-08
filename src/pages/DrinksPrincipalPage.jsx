import React, { useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksCard from '../components/DrinkCard';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import CategoriesButtonsGrid from '../components/CategoriesButtonsGrid';

const maximumDrinkGrid = (data) => data.slice(0, 12);
const maximumCategoriesGrid = (data) => data.slice(0, 5);

const renderDrinksInfoContainer = (
  loading,
  error,
  categoriesError,
  categories,
  drinksData,
) => !loading
  && !error && (
    <div>
      <Header
        iconProfile={profileIcon}
        iconSearch={searchIcon}
        title="Bebidas"
      />
      {!loading && categoriesError ? (
        <h4>{categoriesError}</h4>
      ) : (
        <CategoriesButtonsGrid data={maximumCategoriesGrid(categories)} />
      )}
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
      <Footer />
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
    fetchDrinks,
    categories,
    setCategories,
    categoriesError,
    setCategoriesError,
    fetchDrinksCategories,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoading(true);
    fetchDrinksCategories();
    fetchDrinks();
    return () => {
      setLoading(false);
      setCategories([]);
      setDrinksData([]);
      setError('');
      setCategoriesError('');
    };
  }, []);
  return (
    <main>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h4>{error}</h4>}
      {renderDrinksInfoContainer(
        loading,
        error,
        categoriesError,
        categories,
        drinksData,
      )}
    </main>
  );
};

export default DrinksGrid;
