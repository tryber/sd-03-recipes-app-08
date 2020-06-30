export const getFoodList = async () => {
  const initialPageFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(initialPageFoods);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkList = async () => {
  const initialPageDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(initialPageDrinks);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodsCategoriesList = async () => {
  const foodsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(foodsCategories);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinksCategoriesList = async () => {
  const drinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(drinksCategories);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByCategorie = async (categorie) => {
  const foodsByCategorie = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(foodsByCategorie);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByCategorie = async (categorie) => {
  const drinksByCategorie = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  const response = await fetch(drinksByCategorie);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  console.log(json);
  return data;
};

export const getFoodByIngredient = async (ingredient) => {
  const foodsByIngredient = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(foodsByIngredient);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByIngredient = async (ingredient) => {
  const drinksByIngredient = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(drinksByIngredient);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByName = async (name) => {
  const foodsByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(foodsByName);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByName = async (name) => {
  const drinksByName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(drinksByName);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByFirstLetter = async (letter) => {
  const foodsByFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(foodsByFirstLetter);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByFirstLetter = async (letter) => {
  const drinksByFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
  const response = await fetch(drinksByFirstLetter);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getFoodByID = async (id) => {
  const foodsByID = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(foodsByID);
  const json = await response.json();
  const data = await (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
  return data;
};

export const getDrinkByID = async (id) => {
  const drinksByID = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
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
