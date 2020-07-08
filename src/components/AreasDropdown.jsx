import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../context';

function AreasDropdown({ foodAreas, foodAreasError }) {
  const { foodAreaFilter, setFoodAreaFilter } = useContext(RecipeAppContext);

  if (foodAreasError) return <h4>{foodAreasError}</h4>;
  return (
    <div>
      <select
        name="food-area-selector"
        id="food-area-selector"
        value={foodAreaFilter}
        onChange={(event) => setFoodAreaFilter(event.target.value)}
      >
        <option value="">All</option>
        {foodAreas.map(({ strArea }) => (
          <option value={strArea} key={strArea}>
            {strArea}
          </option>
        ))}
      </select>
    </div>
  );
}

AreasDropdown.defaultProps = {
  foodAreas: [],
  foodAreasError: '',
};

AreasDropdown.propTypes = {
  foodAreas: PropTypes.arrayOf(PropTypes.obj),
  foodAreasError: PropTypes.string,
};

export default AreasDropdown;
