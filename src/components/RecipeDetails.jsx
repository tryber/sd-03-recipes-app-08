import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RecipeAppContext } from '../context';
import Suggestions from './Suggestions';
import InteractiveButtons from './InteractiveButtons';
import dataDealer from '../helpers/dataDealer';
import listIngredients from '../helpers/listIngredients';
import '../styles/RecipeDetails.css';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));
let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
let finishedArr = [{ id: 'nothing', doneDate: '' }];
if (doneRecipesArr) {
  finishedArr = doneRecipesArr;
}
const initialProcess = { meals: {}, cocktails: {} };

const finalProgress = (data, choice, progress) => {
  const auxObj = progress;
  if (choice === 'meal') {
    auxObj.meals[data.id] = [];
  } else {
    auxObj.cocktails[data.id] = [];
  }
  return auxObj;
};

const buttonClick = (data, choice, started) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (started) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    return;
  }
  if (inProgressRecipes) {
    const newProgress = finalProgress(data, choice, inProgressRecipes);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
    return;
  }
  const newProgress = finalProgress(data, choice, initialProcess);
  localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
};

const renderLink = (data, choice, started) => (
  <div>
    <Link
      to={
        choice === 'meal'
          ? `/comidas/${data.id}/in-progress`
          : `/bebidas/${data.id}/in-progress`
      }
    >
      <button
        type="button"
        onClick={() => buttonClick(data, choice, started)}
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        {started ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </Link>
  </div>
);

const renderVideo = (video) => (
  <div data-testid="video" className="video">
    <h2 className="video-title">Video</h2>
    <ReactPlayer url={video} width={360} height={200} />
  </div>
);

const renderDetailsPage = (data, choice, ingredients, finished, started) => (
  <div className="details-page">
    <div className="details-conteiner">
      <header className="details-header">
        <img
          data-testid="recipe-photo"
          src={data.image}
          alt="recipe"
          className="recipe-photo"
        />
        <div className="details-header-text">
          <h1 data-testid="recipe-title" className="recipe-title">
            {data.name}
          </h1>
          <h4 data-testid="recipe-category" className="recipe-category">
            {choice === 'meal' ? data.category : data.alcoholicOrNot}
          </h4>
        </div>
        <InteractiveButtons data={data} choice={choice} />
      </header>
      <div className="ingredients-conteiner">
        <h2 className="ingredients-title">Ingredients</h2>
        <ul className="ingredients-card">
          {ingredients.map((elem, index) => (
            <li
              data-testid={`${index}-ingredient-name-and-measure`}
              key={elem}
              className="ingredient-name-and-measure"
            >
              {elem}
            </li>
          ))}
        </ul>
      </div>
      <div className="instructions-conteiner">
        <h2 className="instructions-title">Instructions</h2>
        <div data-testid="instructions">
          <p className="instructions">
            {data.instructions}
          </p>
        </div>
      </div>
    </div>
    {choice === 'meal' ? renderVideo(data.video) : null}
    <Suggestions />
    {finished ? null : renderLink(data, choice, started)}
  </div>
);

const checkStarted = (id, choice) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let startedArr = initialProcess;
  if (inProgressRecipes) {
    startedArr = inProgressRecipes;
  }
  if (choice === 'meal') {
    const test = startedArr.meals[id];
    return test;
  }
  const test = startedArr.cocktails[id];
  return test;
};

const RecipeDetails = () => {
  const {
    error,
    loading,
    mealDetailData,
    drinkDetailData,
    choice,
  } = useContext(RecipeAppContext);

  const dataHelper = choice === 'meal' ? mealDetailData : drinkDetailData;
  const dataArr = dataDealer(choice, dataHelper);
  const ingredientsArr = listIngredients(dataHelper);

  const finished = finishedArr.some((elem) => elem.id === dataArr.id);
  const started = checkStarted(dataArr.id, choice);

  return (
    <div className="recipe-details-page">
      {!loading && error && <h4>{error}</h4>}
      {renderDetailsPage(dataArr, choice, ingredientsArr, finished, started)}
    </div>
  );
};

export default RecipeDetails;
