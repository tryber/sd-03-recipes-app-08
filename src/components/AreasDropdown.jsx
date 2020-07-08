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
        data-testid="explore-by-area-dropdown"
        value={foodAreaFilter}
        onChange={(event) => setFoodAreaFilter(event.target.value)}
      >
        <option value="" data-testid="All-option">All</option>
        {foodAreas.map(({ strArea }) => (
          <option value={strArea} key={strArea} data-testid={`${strArea}-option`}>
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
  foodAreas: PropTypes.arrayOf(PropTypes.object),
  foodAreasError: PropTypes.string,
};

export default AreasDropdown;
