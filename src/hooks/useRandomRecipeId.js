import { useEffect, useState, useCallback } from 'react';
import { fetchRandomMeal, fetchRandomDrink } from '../services/fetchHandlers';

export default function useRandomRecipeId(location) {
  const [randomRecipeId, setRandomRecipeId] = useState('');
  const [randomRecipeIdError, setRandomRecipeIdError] = useState('');

  const setRecipeFetch = useCallback(() => (location === '/explorar/comidas'
    ? fetchRandomMeal(setRandomRecipeId, setRandomRecipeIdError)
    : fetchRandomDrink(setRandomRecipeId, setRandomRecipeIdError)), [location]);

  useEffect(() => {
    setRecipeFetch();
    return () => {
      setRandomRecipeId('');
      setRandomRecipeIdError('');
    };
  }, [setRecipeFetch]);

  return { randomRecipeId, randomRecipeIdError };
}
