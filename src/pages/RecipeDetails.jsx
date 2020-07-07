import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RecipeAppContext } from '../context';
import Suggestions from '../components/Suggestions';
import FavoriteButton from '../components/FavoriteButton';
import Clipboard from '../components/Clipboard';
import dataDealer from '../helpers/dataDealer';
import listIngredients from '../helpers/listIngredients';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));
const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

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
);

const renderVideo = (video) => (
  <div data-testid="video" className="video">
    <div className="video-title">Video</div>
    <ReactPlayer url={video} width={400} height={200} />
  </div>
);

const renderDetailsPage = (data, choice, ingredients, finished, started) => (
  <div>
    <img data-testid="recipe-photo" src={data.image} alt="recipe" className="recipe-photo" />
    <title data-testid="recipe-title" className="recipe-title">{data.name}</title>
    <Clipboard id={data.id} choice={choice} />
    <FavoriteButton data={data} />
    <div data-testid="recipe-category" className="recipe-category">{data.category}</div>
    <div className="ingredients-title">Ingredients</div>
    <div className="ingredients-card">
      {ingredients.map((elem, index) => (
        <div
          data-testid={`${index}-ingredient-name-and-measure`}
          key={elem}
          className="ingredient-name-and-measure"
        >
          {elem}
        </div>
      ))}
    </div>
    <div className="intructions-title">Instructions</div>
    <div data-testid="instructions" className="instructions">{data.instructions}</div>
    <Suggestions />
    {(choice === 'meal') ? renderVideo(data.video) : null}
    {(finished) ? null : renderLink(data, choice, started)}
  </div>
);

const checkStarted = (id, choice) => {
  if (choice === 'meal') {
    const test = inProgressRecipes.filter((elem) => elem.meals === id);
    return test;
  }
  const test = inProgressRecipes.filter((elem) => elem.cocktails === id);
  return test;
};

const RecipeDetails = () => {
  const {
    error, loading, setLoading, fetchMealID, fetchDrinkID,
    mealDetailData, drinkDetailData, choice, fetchBasicMeal, fetchBasicDrink,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    if (choice === 'meal') fetchMealID(id);
    if (choice === 'drink') fetchDrinkID(id);
    fetchBasicDrink();
    fetchBasicMeal();
  }, [choice]);
  if (mealDetailData.length === 0 && drinkDetailData.length === 0) return <h1>Loading...</h1>;
  const dataHelper = (choice === 'meal')
    ? mealDetailData
    : drinkDetailData;
  const dataArr = dataDealer(choice, dataHelper);
  const ingredientsArr = listIngredients(dataHelper);

  let finished = false;
  let started = false;
  if (doneRecipesArr) {
    finished = doneRecipesArr.some((elem) => elem.id === dataArr.id);
  }
  if (inProgressRecipes) {
    started = checkStarted(dataArr.id, choice);
  }

  return (
    <div>
      {!loading && error && <h4>{error}</h4>}
      {renderDetailsPage(dataArr, choice, ingredientsArr, finished, started)}
    </div>
  );
};

export default RecipeDetails;
