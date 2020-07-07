import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RecipeAppContext } from '../context';
import Suggestions from './Suggestions';
import FavoriteButton from './FavoriteButton';
import Clipboard from './Clipboard';
import dataDealer from '../helpers/dataDealer';
import listIngredients from '../helpers/listIngredients';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));
const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
let finishedArr = [{ id: 'nothing' }];
if (doneRecipesArr) {
  finishedArr = doneRecipesArr;
}

let today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();
today = `${day} / ${month} / ${year}`;

const buttonClick = (data) => {
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
  const newDoneRecipesArr = (doneRecipesArr) ? [...doneRecipesArr, newObj] : [];
  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesArr));
};

const renderLink = (data, choice, started) => (
  <div>
    <Link
      to={(choice === 'meal')
        ? `/comidas/${data.id}/in-progress`
        : `/bebidas/${data.id}/in-progress`}
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
    <h1 data-testid="recipe-title" className="recipe-title">{data.name}</h1>
    <p data-testid="recipe-category" className="recipe-category">
      {(choice === 'meal') ? data.category : data.alcoholicOrNot}
    </p>
    <Clipboard id={data.id} choice={choice} />
    <FavoriteButton data={data} />
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
    <h2 className="intructions-title">Instructions</h2>
    <div className="instructions">
      <p data-testid="instructions">{data.instructions}</p>
    </div>
    <Suggestions />
    {(choice === 'meal') ? renderVideo(data.video) : null}
    {(finished) ? null : renderLink(data, choice, started)}
  </div>
);

const checkStarted = (id, choice) => {
  let startedArr = [{ id: 'nothing' }];
  if (inProgressRecipes) {
    startedArr = inProgressRecipes;
  }
  if (choice === 'meal') {
    const test = startedArr.some((elem) => elem.meals === id);
    return test;
  }
  const test = startedArr.some((elem) => elem.cocktails === id);
  return test;
};

const RecipeDetails = () => {
  const {
    error, loading, setLoading, mealDetailData, drinkDetailData, choice,
  } = useContext(RecipeAppContext);
  useEffect(() => {
    setLoading(true);
  }, [choice]);

  if (mealDetailData.length === 0 && drinkDetailData.length === 0) return <h1>Loading...</h1>;

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
