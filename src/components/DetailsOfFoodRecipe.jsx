import React, { useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';

const DetailsOfFoodRecipe = () => {
  const {
    error,
    loading,
    setLoading,
    mealID,
    setMealID,
    fetchMealID,
    mealDetailData,
    setMealDetailData,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoading(true),
    fetchMealID(mealID),
  }, [mealID]);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h4>{error}</h4>}
      {}
    </div>
  );
};

export default DetailsOfFoodRecipe;
