import React, { useState, useEffect, useContext } from 'react';
import { RecipeAppContext } from '../context';
import { fetchAllFoodAreas } from '../services/fetchHandlers';

function AreasDropdown() {
  const { foodAreaFilter, setFoodAreaFilter } = useContext(RecipeAppContext);
  const [foodAreas, setFoodAreas] = useState([]);
  const [foodAreasError, setFoodAreasError] = useState('');

  useEffect(() => {
    fetchAllFoodAreas(setFoodAreas, setFoodAreasError);
    return () => {
      setFoodAreas([]);
      setFoodAreasError('');
    };
  }, []);

  if (foodAreasError) return (<h4>{foodAreasError}</h4>);
  return (
    <div>
      <select
        name="food-area-selector"
        id="food-area-selector"
        value={foodAreaFilter}
        onChange={(event) => setFoodAreaFilter(event.target.value)}
      >
        <option value="">All</option>
        {foodAreas.map((area) => <option value={area} key={area}>{area}</option>)}
      </select>
    </div>
  );
}

export default AreasDropdown;
