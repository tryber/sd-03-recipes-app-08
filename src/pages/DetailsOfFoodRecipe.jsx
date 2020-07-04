import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeAppContext } from '../context';
import Suggestions from '../components/Suggestions';
import Clipboard from '../components/Clipboard';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';

// localStorage.setItem('buyList', JSON.stringify(buyListArr));

const favoriteRecipesArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
const doneRecipesArr = JSON.parse(localStorage.getItem('doneRecipes'));

const handleFavorite = (data, favorite, setFavorite) => {
  if (favorite) {
    setFavorite(false);
    const newFavoriteRecipesArr = favoriteRecipesArr.map((elem) => elem.id !== data.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  } else {
    setFavorite(true);
    const newFavoriteRecipesArr = [...favoriteRecipesArr, data];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesArr));
  }
};

const renderFavorite = (data, favorite, setFavorite) => {
  if (favorite) {
    return (
      <button
        type="button"
        onClick={handleFavorite(data, favorite, setFavorite)}
        data-testid="favorite-btn"
        className="favorite-btn"
      >
        <img alt="white-heart" src={WhiteHeart} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={handleFavorite(data, favorite, setFavorite)}
      data-testid="favorite-btn"
      className="favorite-btn"
    >
      <img alt="black-heart" src={BlackHeart} />
    </button>
  );
};

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
  localStorage.setItem('doneRecipes', [...doneRecipesArr, JSON.stringify(newObj)]);
};

const renderLink = (data, choice, finished) => (
  <Link
    to={(choice === 'meal')
      ? `/comidas/${data.id}/in-progress`
      : `/bebidas/${data.id}/in-progress`}
  >
    <button
      type="button"
      onClick={buttonClick(data)}
      data-testid="start-recipe-btn"
      className="start-recipe-btn"
    >
      {(finished) ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  </Link>
);

const renderVideo = (video) => (
  <video data-testid="video" className="video" controls>
    <source src={video} type="video/mp4" />
    <track src="recipe_en.vtt" kind="captions" srcLang="en" label="english_captions" />
  </video>
);

const creatingredientsArr = (detailData) => {
  const ingredients = Object.entries(detailData).filter((elem) => elem.match(/strIngredient/i));
  const measures = Object.entries(detailData).filter((elem) => elem.match(/strMeasure/i));
  const arr = ingredients.reduce((acc, elem, index) => {
    if (elem !== '' || elem !== null || elem !== undefined) {
      return [...acc, [`- ${elem[1]} - ${measures[index][1]}`]];
    }
    return acc;
  }, []);
  return arr;
};

const renderDetailsPage = (
  data, choice, ingredients, favorite, setFavorite, finished,
) => (
  <div>
    <img data-testid="recipe-photo" src={data.image} alt="recipe" className="recipe-photo" />
    <title data-testid="recipe-title" className="recipe-title">{data.name}</title>
    <Clipboard id={data.id} choice={choice} />
    {renderFavorite(data, favorite, setFavorite)}
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
    {(finished.doneDate !== null) ? renderLink(data, choice, finished) : null}
  </div>
);

const creatDataArr = (choice, detailData) => {
  if (choice === 'meal') {
    return (
      {
        id: detailData.idMeal,
        type: 'meal',
        area: detailData.strArea,
        category: detailData.strCategory,
        alcoholicOrNot: false,
        name: detailData.strMeal,
        image: detailData.strMealThumb,
        instructions: detailData.strInstructions,
        video: detailData.strYoutube,
        doneDate: null,
        tags: detailData.strTags,

      }
    );
  }
  return (
    {
      id: detailData.idDrink,
      type: 'drink',
      area: null,
      category: detailData.strCategory,
      alcoholicOrNot: (detailData.strAlcoholic === 'Alcoholic'),
      name: detailData.strDrink,
      image: detailData.strDrinkThumb,
      instructions: detailData.strInstructions,
      video: null,
      doneDate: null,
      tags: detailData.strTags,
    }
  );
};

const DetailsOfFoodRecipe = () => {
  const {
    error,
    loading,
    setLoading,
    selectedID,
    fetchMealID,
    fetchDrinkID,
    mealDetailData,
    drinkDetailData,
    choice,
    favorite,
    setFavorite,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    setLoading(true);
    if (choice === 'meal') fetchMealID(selectedID);
    if (choice === 'drink') fetchDrinkID(selectedID);
  }, [selectedID]);

  const dataArr = (choice === 'meal')
    ? creatDataArr(choice, mealDetailData)
    : creatDataArr(choice, drinkDetailData);
  const ingredientsArr = (choice === 'meal')
    ? creatingredientsArr(mealDetailData)
    : creatingredientsArr(drinkDetailData);
  const favoritetest = favoriteRecipesArr.sort((elem) => elem.id === dataArr.id);
  const finished = doneRecipesArr.filter((elem) => elem.id === dataArr.id);

  if (favoritetest) setFavorite(true);
  if (!favoritetest) setFavorite(false);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h4>{error}</h4>}
      {renderDetailsPage(
        dataArr,
        choice,
        ingredientsArr,
        favorite,
        setFavorite,
        finished,
      )}
    </div>
  );
};

export default DetailsOfFoodRecipe;
