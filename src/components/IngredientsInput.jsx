import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../context';
import '../styles/RecipeDetails.css';

let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

const addToProgress = (choice, id, index) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (choice === 'meal') {
    const actualMealIngredientArr = inProgressRecipes.meals[id];
    const ingredientArr = [...actualMealIngredientArr, index];
    inProgressRecipes.meals[id] = ingredientArr;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    return;
  }
  const actualDrinkIngredientArr = inProgressRecipes.cocktails[id];
  const ingredientArr = [...actualDrinkIngredientArr, index];
  inProgressRecipes.cocktails[id] = ingredientArr;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

const excludeFromProgress = (choice, id, index) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (choice === 'meal') {
    const actualMealIngredientArr = inProgressRecipes.meals[id];
    const finalIngredientArr = actualMealIngredientArr.filter((elem) => elem !== index);
    // console.log(finalIngredientArr);
    inProgressRecipes.meals[id] = finalIngredientArr;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    return;
  }
  const actualDrinkIngredientArr = inProgressRecipes.cocktails[id];
  const finalIngredientArr = actualDrinkIngredientArr.filter((elem) => elem !== index);
  inProgressRecipes.cocktails[id] = finalIngredientArr;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

const inputClicked = (choice, id, marked, setMarked, index) => {
  if (marked) {
    excludeFromProgress(choice, id, index);
    setMarked(false);
    // console.log(marked);
    return;
  }
  addToProgress(choice, id, index);
  setMarked(true);
  // console.log(marked);
};

const checkBoxTest = (id, choice, index) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (choice === 'meal'
    && inProgressRecipes.meals && inProgressRecipes.meals[id].some((elem) => elem === index)) {
    return true;
  }
  if (choice === 'drink'
    && inProgressRecipes.cocktails
    && inProgressRecipes.cocktails[id].some((elem) => elem === index)) {
    return true;
  }
  return false;
};

const checkTextDecoration = (id, choice, index) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (choice === 'meal' && inProgressRecipes.cocktails
    && inProgressRecipes.meals[id].some((elem) => elem === index)) {
    return 'line-through';
  }
  if (choice === 'drink' && inProgressRecipes.cocktails
    && inProgressRecipes.cocktails[id].some((elem) => elem === index)) {
    return 'line-through';
  }
  return '';
};

const checkFinished = (id, size, choice, setFinished) => {
  inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (choice === 'meal' && inProgressRecipes.meals && inProgressRecipes.meals[id]) {
    const itemLenght = (
      inProgressRecipes.meals[id].length === size);
    setFinished(itemLenght);
    return;
  }
  if (choice === 'drink' && inProgressRecipes.cocktails && inProgressRecipes.cocktails[id]) {
    const itemLenght = (
      inProgressRecipes.cocktails[id].length === size);
    setFinished(itemLenght);
    return;
  }
  setFinished(false);
};

const renderInputList = (choice, id, ingredient, index, marked, setMarked, size, setFinished) => {
  checkFinished(id, size, choice, setFinished);
  return (
    <div data-testid={`${index}-ingredient-step`}>
      <label style={{ textDecoration: (checkTextDecoration(id, choice, index)) }} htmlFor={index}>
        <input
          id={index}
          type="checkbox"
          checked={checkBoxTest(id, choice, index)}
          onChange={() => inputClicked(choice, id, marked, setMarked, index)}
        />
        {ingredient}
      </label>
    </div>
  );
};

const IngredientsInput = ({ ingredient, index, size }) => {
  const [marked, setMarked] = useState(false);
  const {
    choice, mealDetailData, drinkDetailData, setFinished,
  } = useContext(RecipeAppContext);
  const id = (choice === 'meal') ? mealDetailData[0].idMeal : drinkDetailData[0].idDrink;
  useEffect(() => {
    if (choice === 'meal'
      && inProgressRecipes.meals
      && inProgressRecipes.meals[id].some((elem) => elem === ingredient)) {
      setMarked(true);
    }
    if (choice === 'drink'
      && inProgressRecipes.cocktails
      && inProgressRecipes.cocktails[id].some((elem) => elem === ingredient)) {
      setMarked(true);
    }
  }, [choice]);
  return (
    <div>
      {renderInputList(choice, id, ingredient, index, marked, setMarked, size, setFinished)}
    </div>
  );
};

export default IngredientsInput;

IngredientsInput.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};
