import { useContext } from 'react';
import { RecipeAppContext } from '../context';

export default function useBeverageorMealsContext(location) {
  const { mealsData, beverageData } = useContext(RecipeAppContext);

  if (location.pathname === '/comidas') return mealsData;
  return beverageData;
}
