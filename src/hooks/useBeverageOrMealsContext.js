import { useContext } from 'react';
import { RecipeAppContext } from '../context';

export default function useBeverageorMealsContext({ pathname }) {
  const { mealsData, beverageData } = useContext(RecipeAppContext);

  if (pathname === '/comidas') return mealsData;
  return beverageData;
}
