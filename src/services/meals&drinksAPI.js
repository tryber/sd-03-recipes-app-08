const initialFoodsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?';

const initialDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

export const getFoodList = async () => {
  const initialPageFoods = `${initialFoodsURL}s=`;
  const response = await fetch(initialPageFoods);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkList = async () => {
  const initialPageDrinks = `${initialDrinksURL}s=`;
  const response = await fetch(initialPageDrinks);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodsCategoriesList = async () => {
  const foodsCategories = `${initialFoodsURL}c=list`;
  const response = await fetch(foodsCategories);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinksCategoriesList = async () => {
  const drinksCategories = `${initialDrinksURL}c=list`;
  const response = await fetch(drinksCategories);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByCategorie = async (categorie) => {
  const foodsByCategorie = `${initialFoodsURL}c=${categorie}`;
  const response = await fetch(foodsByCategorie);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByCategorie = async (categorie) => {
  const drinksByCategorie = `${initialDrinksURL}c=${categorie}`;
  const response = await fetch(drinksByCategorie);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByIngredient = async (ingredient) => {
  const foodsByIngredient = `${initialFoodsURL}i=${ingredient}`;
  const response = await fetch(foodsByIngredient);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByIngredient = async (ingredient) => {
  const drinksByIngredient = `${initialDrinksURL}i=${ingredient}`;
  const response = await fetch(drinksByIngredient);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByName = async (name) => {
  const foodsByName = `${initialFoodsURL}i=${name}`;
  const response = await fetch(foodsByName);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByName = async (name) => {
  const drinksByName = `${initialDrinksURL}i=${name}`;
  const response = await fetch(drinksByName);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByFirstLetter = async (letter) => {
  const foodsByFirstLetter = `${initialFoodsURL}f=${letter}`;
  const response = await fetch(foodsByFirstLetter);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByFirstLetter = async (letter) => {
  const drinksByFirstLetter = `${initialDrinksURL}f=${letter}`;
  const response = await fetch(drinksByFirstLetter);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByID = async (id) => {
  const foodsByID = `${initialFoodsURL}i=${id}`;
  const response = await fetch(foodsByID);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByID = async (id) => {
  const drinksByID = `${initialDrinksURL}i=${id}`;
  const response = await fetch(drinksByID);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getRandomFood = async () => {
  const randomFoods = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(randomFoods);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getRandomDrink = async () => {
  const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(randomDrinks);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};
