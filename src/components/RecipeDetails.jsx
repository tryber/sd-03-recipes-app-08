import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RecipeAppContext } from '../context';
import Suggestions from './Suggestions';
import FavoriteButton from './FavoriteButton';
import Clipboard from './Clipboard';
import dataDealer from '../helpers/dataDealer';
import listIngredients from '../helpers/listIngredients';
import '../styles/RecipeDetails.css';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));
let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
// console.log(inProgressRecipes);
let finishedArr = [{ id: 'nothing', doneDate: '' }];
if (doneRecipesArr) {
  finishedArr = doneRecipesArr;
}
const initialProcess = { meals: {}, cocktails: {} };

// let today = new Date();
// const day = String(today.getDate()).padStart(2, '0');
// const month = String(today.getMonth() + 1).padStart(2, '0');
// const year = today.getFullYear();
// today = `${day} / ${month} / ${year}`;

// const buttonClick = (data) => {
//   const newObj = {
//     id: data.id,
//     type: data.type,
//     area: data.area,
//     category: data.category,
//     alcoholicOrNot: data.alcoholicOrNot,
//     name: data.name,
//     image: data.image,
//     doneDate: today,
//     tags: data.tags,
//   };
//   const newDoneRecipesArr = (doneRecipesArr) ? [...doneRecipesArr, newObj] : [newObj];
//   localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArr));
// };

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
  // const key = (choice === 'meal') ? 'meals' : 'cocktails';
  if (started) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    return;
  }
  // const newObj = {
  //   [data.id]: [],
  // };
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
      to={(choice === 'meal')
        ? `/comidas/${data.id}/in-progress`
        : `/bebidas/${data.id}/in-progress`}
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
    >
      <button
        type="button"
        onClick={() => buttonClick(data, choice, started)}
      >
        {(started) ? 'Continuar Receita' : 'Iniciar Receita'}
      </button>
    </Link>
  </div>
);

const renderVideo = (video) => (
  <div data-testid="video" className="video">
    <h2 className="video-title">Video</h2>
    <ReactPlayer url={video} width={400} height={200} />
  </div>
);

const renderDetailsPage = (data, choice, ingredients, finished, started) => (
  <div>
    <img data-testid="recipe-photo" src={data.image} alt="recipe" className="recipe-photo" />
    <div className="details-conteiner">
      <div className="details-header">
        <div className="details-header-text">
          <h1 data-testid="recipe-title" className="recipe-title">{data.name}</h1>
          <span data-testid="recipe-category" className="recipe-category">
            {(choice === 'meal') ? data.category : data.alcoholicOrNot}
          </span>
        </div>
        <div className="details-header-button">
          <Clipboard id={data.id} choice={choice} />
          <FavoriteButton data={data} />
        </div>
      </div>
      <h2 className="ingredients-title">Ingredients</h2>
      <div className="ingredients-conteiner">
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
      <h2 className="intructions-title">Instructions</h2>
      <div className="instructions-conteiner">
        <p className="instructions" data-testid="instructions">
          {data.instructions}
        </p>
      </div>
    </div>
    {(choice === 'meal') ? renderVideo(data.video) : null}
    <Suggestions />
    {(finished) ? null : renderLink(data, choice, started)}
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
    // some((elem) => elem.meals === id);
    return test;
  }
  const test = startedArr.cocktails[id];
  // some((elem) => elem.cocktails === id);
  return test;
};

const RecipeDetails = () => {
  const {
    error, loading, mealDetailData, drinkDetailData, choice,
  } = useContext(RecipeAppContext);

  const dataHelper = (choice === 'meal')
    ? mealDetailData
    : drinkDetailData;
  const dataArr = dataDealer(choice, dataHelper);
  const ingredientsArr = listIngredients(dataHelper);

  const finished = finishedArr.some((elem) => elem.id === dataArr.id);
  const started = checkStarted(dataArr.id, choice);

  return (
    <div>
      {!loading && error && <h4>{error}</h4>}
      {renderDetailsPage(dataArr, choice, ingredientsArr, finished, started)}
    </div>
  );
};

export default RecipeDetails;
