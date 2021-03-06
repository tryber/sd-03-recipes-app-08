import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../context';
import InteractiveButtons from './InteractiveButtons';
import IngredientsInput from './IngredientsInput';
import listIngredients from '../helpers/listIngredients';
import '../styles/RecipeDetails.css';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = `${day} / ${month} / ${year}`;

const doneButtonClick = (data) => {
  const newObj = {
    id: data.id,
    type: data.type,
    area: data.area,
    category: data.category,
    alcoholicOrNot: data.alcoholicOrNot,
    name: data.name,
    image: data.image,
    doneDate: today,
    tags: data.tags,
  };
  const newDoneRecipesArr = doneRecipesArr
    ? [...doneRecipesArr, newObj]
    : [newObj];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArr));
};

const checkDisabled = (finished) => {
  if (finished) return false;
  return true;
};

// const checkLink = (finished) => {
//   if (finished) {
//     return (
//       <Link to="/receitas-feitas">
//         Finalizar Receita
//       </Link>
//     );
//   }
//   return 'Finalizar Receita';
// };

const renderDoneLink = (data, finished) => (
  <Link to={finished ? '/receitas-feitas' : '#'}>
    <button
      className="start-recipe-btn"
      data-testid="finish-recipe-btn"
      type="button"
      disabled={checkDisabled(finished)}
      onClick={() => doneButtonClick(data)}
    >
      Finalizar Receita
    </button>
  </Link>
);

const renderInProgressPage = (data, choice, finished, ingredients) => (
  <div className="details-page">
    <img
      data-testid="recipe-photo"
      src={data.image}
      alt="recipe"
      className="recipe-photo"
    />
    <div className="details-conteiner">
      <div className="details-header">
        <div className="details-header-text">
          <h1 data-testid="recipe-title" className="recipe-title">
            {data.name}
          </h1>
          <span data-testid="recipe-category" className="recipe-category">
            {choice === 'meal' ? data.category : data.alcoholicOrNot}
          </span>
        </div>
        <InteractiveButtons data={data} choice={choice} />
      </div>
      <h2 className="ingredients-title">Ingredients</h2>
      <div className="ingredients-conteiner">
        {ingredients.map((elem, index) => (
          <IngredientsInput
            key={elem}
            ingredient={elem}
            index={index}
            size={ingredients.length}
          />
        ))}
      </div>
      <h2 className="instructions-title">Instructions</h2>
      <div className="instructions-conteiner" data-testid="instructions">
        <p className="instructions" data-testid="instructions">
          {data.instructions}
        </p>
      </div>
    </div>
    {renderDoneLink(data, finished)}
  </div>
);

const InProgress = ({ data }) => {
  const {
    error,
    loading,
    choice,
    mealDetailData,
    drinkDetailData,
    finished,
  } = useContext(RecipeAppContext);

  const checkIngredients = choice === 'meal'
    ? listIngredients(mealDetailData)
    : listIngredients(drinkDetailData);

  return (
    <div className="recipe-details-page">
      {!loading && error && <h4>{error}</h4>}
      {renderInProgressPage(data, choice, finished, checkIngredients)}
    </div>
  );
};

export default InProgress;

InProgress.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.string,
    video: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
