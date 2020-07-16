import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import FavoritePage from '../pages/FavoritePage';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Icon from '../images/shareIcon.svg';
import BlackHeart from '../images/blackHeartIcon.svg';

const arrAuxiliar = [
  {
    id: oneMeal.meals[0].idMeal,
    type: 'comida',
    area: oneMeal.meals[0].strArea,
    category: oneMeal.meals[0].strCategory,
    alcoholicOrNot: '',
    name: oneMeal.meals[0].strMeal,
    image: oneMeal.meals[0].strMealThumb,
  },
  {
    id: oneDrink.drinks[0].idDrink,
    type: 'bebida',
    area: '',
    category: oneDrink.drinks[0].strCategory,
    alcoholicOrNot: oneDrink.drinks[0].strAlcoholic,
    name: oneDrink.drinks[0].strDrink,
    image: oneDrink.drinks[0].strDrinkThumb,
  },
];

describe('Done recipes component test', () => {
  afterEach(cleanup);

  test('Check if the loading happens', async () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>,
    );
    const loadTest = getByText('Loading...');
    expect(loadTest).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the favorite buttons and their data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('filter-by-all-btn');

    const allButtonRecipe = getByTestId('filter-by-all-btn');
    expect(allButtonRecipe).toBeInTheDocument();
    expect(allButtonRecipe).toHaveTextContent('All');

    const foodButtonRecipe = getByTestId('filter-by-food-btn');
    expect(foodButtonRecipe).toBeInTheDocument();
    expect(foodButtonRecipe).toHaveTextContent('Food');

    const drinkButtonRecipe = getByTestId('filter-by-drink-btn');
    expect(drinkButtonRecipe).toBeInTheDocument();
    expect(drinkButtonRecipe).toHaveTextContent('Drinks');');
  });

  test('Check the favorite photos and their data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('0-horizontal-image');

    const image0Recipe = getByTestId('0-horizontal-image');
    expect(image0Recipe).toBeInTheDocument();
    expect(image0Recipe.src).toBe(oneMeal.meals[0].strMealThumb);

    const image1Recipe = getByTestId('1-horizontal-image');
    expect(image1Recipe).toBeInTheDocument();
    expect(image1Recipe.src).toBe(oneDrink.drinks[0].strDrinkThumb);
  });

  test('Check the favorite titles and their data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('0-horizontal-name');

    const title0Recipe = getByTestId('0-horizontal-name');
    expect(title0Recipe).toBeInTheDocument();
    expect(title0Recipe).toHaveTextContent(oneMeal.meals[0].strMeal);

    const title1Recipe = getByTestId('1-horizontal-name');
    expect(title1Recipe).toBeInTheDocument();
    expect(title1Recipe).toHaveTextContent(oneDrink.drinks[0].strDrink);
  });

  test('Check the favorite top text and their data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('0-horizontal-top-text');

    const category0Recipe = getByTestId('0-horizontal-top-text');
    expect(category0Recipe).toBeInTheDocument();
    expect(category0Recipe).toHaveTextContent(oneMeal.meals[0].strCategory);

    const category1Recipe = getByTestId('1-horizontal-top-text');
    expect(category1Recipe).toBeInTheDocument();
    expect(category1Recipe).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);
  });

  test('Check the favorite share button and their data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('0-horizontal-share-btn');

    const share0Recipe = getByTestId('0-horizontal-share-btn');
    expect(share0Recipe).toBeInTheDocument();
    expect(share0Recipe).toHaveAttribute('src', Icon);

    const share1Recipe = getByTestId('1-horizontal-share-btn');
    expect(share1Recipe).toBeInTheDocument();
    expect(share1Recipe).toHaveAttribute('src', Icon);
  });

  test('Check the favorite exclude button 1 and his data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('0-horizontal-favorite-btn');

    const favorite0Recipe = getByTestId('0-horizontal-favorite-btn');
    expect(favorite0Recipe).toBeInTheDocument();
    expect(favorite0Recipe).toHaveAttribute('src', BlackHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(2);
    fireEvent.click(favorite0Recipe);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);

  });

  test('Check the favorite exclude button 2 and his data-testId', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <FavoritePage />
      </Provider>, { route: '/receitas-favoritas' },
    );
    await findByTestId('1-horizontal-favorite-btn');

    const favorite1Recipe = getByTestId('1-horizontal-favorite-btn');
    expect(favorite1Recipe).toBeInTheDocument();
    expect(favorite1Recipe).toHaveAttribute('src', BlackHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(2);
    fireEvent.click(favorite1Recipe);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);

  });
});