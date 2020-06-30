import React from 'react';
import PropTypes from 'prop-types';

const CategoriesButtonsGrid = ({ data, onClick }) => (
  <div>
    <button type="button" onClick={onClick} data-testid="All-category-filter">
      All
    </button>
    {data.map((element) => (
      <button
        key={element.strCategory}
        type="button"
        onClick={onClick}
        data-testid={`${element.strCategory}-category-filter`}
      >
        {element.strCategory}
      </button>
    ))}
  </div>
);

CategoriesButtonsGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CategoriesButtonsGrid;
