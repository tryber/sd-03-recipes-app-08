import React, { useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksCard from '../components/DrinkCard';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const maximumDrinkGrid = (data) => data.slice(0, 12);

function DrinksGrid() {
  const {
    drinksData,
    setDrinksData,
    error,
    setError,
    loading,
    setLoading,
    fetchDrinks,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    fetchDrinks();
    return () => {
      setLoading(false);
      setDrinksData([]);
      setError('');
    };
  }, []);
  return (
    <main>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h4>{error}</h4>}
      {!loading && !error && (
        <div>
          <Header
            iconProfile={profileIcon}
            iconSearch={searchIcon}
            title="Bebidas"
          />
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
      )}
    </main>
  );
}

export default DrinksGrid;
