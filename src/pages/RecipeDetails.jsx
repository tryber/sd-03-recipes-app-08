import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RecipeAppContext } from '../context';
// import Suggestions from '../components/Suggestions';
import FavoriteButton from '../components/FavoriteButton';
import Clipboard from '../components/Clipboard';

const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));

const buttonClick = (data) => {
  const newObj = {
    id: data.id,
    type: data.type,
    area: data.area,
    category: data.category,
    alcoholicOrNot: data.alcoholicOrNot,
    name: data.name,
    image: data.image,
    doneDate: data.doneDate,
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
      onClick={() => buttonClick(data)}
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
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

const creatingredientsArr = (detailData) => {
  const ingredients = Object.entries(detailData[0]).filter((elem) => elem[0].match(/strIngredient/i));
  const measures = Object.entries(detailData[0]).filter((elem) => elem[0].match(/strMeasure/i));
  const arr = ingredients.reduce((acc, elem, index) => {
    if (elem[1]) {
      return [...acc, `- ${elem[1]} - ${measures[index][1]}`];
    }
    return acc;
  }, []);
  return arr;
};

const renderDetailsPage = (
  data, choice, ingredients, favorite, setFavorite, finished, started,
) => (
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
    {/* <Suggestions /> */}
    {(choice === 'meal') ? renderVideo(data.video) : null}
    {(finished.doneDate !== null || !started) ? renderLink(data, choice, started) : null}
  </div>
);

const creatDataArr = (choice, detailData) => {
  if (choice === 'meal') {
    return (
      {
        id: detailData[0].idMeal,
        type: 'meal',
        area: detailData[0].strArea,
        category: detailData[0].strCategory,
        alcoholicOrNot: false,
        name: detailData[0].strMeal,
        image: detailData[0].strMealThumb,
        instructions: detailData[0].strInstructions,
        video: detailData[0].strYoutube,
        doneDate: null,
        tags: detailData[0].strTags,
      }
    );
  }
  return (
    {
      id: detailData[0].idDrink,
      type: 'drink',
      area: null,
      category: detailData[0].strCategory,
      alcoholicOrNot: (detailData[0].strAlcoholic === 'Alcoholic'),
      name: detailData[0].strDrink,
      image: detailData.strDrinkThumb,
      instructions: detailData[0].strInstructions,
      video: null,
      doneDate: null,
      tags: detailData[0].strTags,
    }
  );
};

const RecipeDetails = () => {
  const {
    error, loading, setLoading, fetchMealID, fetchDrinkID,
    mealDetailData, drinkDetailData, choice, favorite, setFavorite,
  } = useContext(RecipeAppContext);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    if (choice === 'meal') fetchMealID(id);
    if (choice === 'drink') fetchDrinkID(id);
  }, [choice]);
  if (mealDetailData.length === 0 && drinkDetailData.length === 0) return <h1>Loading...</h1>;
  let finished = { doneDate: null };
  let started = false;
  const dataArr = (choice === 'meal')
    ? creatDataArr(choice, mealDetailData)
    : creatDataArr(choice, drinkDetailData);
  if (doneRecipesArr) {
    finished = doneRecipesArr.filter((elem) => elem.id === dataArr.id);
    started = doneRecipesArr.filter((elem) => elem.id === dataArr.id);
  }
  const ingredientsArr = (choice === 'meal')
    ? creatingredientsArr(mealDetailData)
    : creatingredientsArr(drinkDetailData);
  return (
    <div>
      {!loading && error && <h4>{error}</h4>}
      {renderDetailsPage(
        dataArr, choice, ingredientsArr, favorite, setFavorite, finished, started,
      )}
    </div>
  );
};

export default RecipeDetails;
