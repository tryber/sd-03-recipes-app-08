import { useContext, useEffect } from 'react';
import { RecipeAppContext } from '../context';

export default function useBeverageorMealsContext(location) {
  const { mealsData, beverageData } = useContext(RecipeAppContext);

  useEffect(() => {
    mealsData.setCategoriesFilter('All');
    beverageData.setCategoriesFilter('All');
    return () => {
      mealsData.setCategoriesFilter('All');
      beverageData.setCategoriesFilter('All');
    };
  }, [location]);

  if (location.pathname === '/comidas') return mealsData;
  return beverageData;
}
