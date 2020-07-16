import React from 'react';
import { cleanup } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import DonePage from '../pages/DonePage';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Icon from '../images/shareIcon.svg';

const arrAuxiliar = [
  {
    id: oneMeal.meals[0].idMeal,
    type: 'comida',
    area: oneMeal.meals[0].strArea,
    category: oneMeal.meals[0].strCategory,
    alcoholicOrNot: '',
    name: oneMeal.meals[0].strMeal,
    image: oneMeal.meals[0].strMealThumb,
    doneDate: '15/06/2020',
    video: oneMeal.meals[0].strYoutube,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: oneDrink.drinks[0].idDrink,
    type: 'bebida',
    area: '',
    category: oneDrink.drinks[0].strCategory,
    alcoholicOrNot: oneDrink.drinks[0].strAlcoholic,
    name: oneDrink.drinks[0].strDrink,
    image: oneDrink.drinks[0].strDrinkThumb,
    doneDate: '15/06/2020',
    tags: oneDrink.drinks[0].strTags,
  },
];

describe('Done recipes component test', () => {
  afterEach(cleanup);

  test('Check if the loading happens', async () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>,
    );
    const loadTest = getByText('Loading...');
    expect(loadTest).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the favorite buttons and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
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
    expect(drinkButtonRecipe).toHaveTextContent('Drinks');
  });

  test('Check the done photos and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-horizontal-image');

    const image0Recipe = getByTestId('0-horizontal-image');
    expect(image0Recipe).toBeInTheDocument();
    expect(image0Recipe.src).toBe(oneMeal.meals[0].strMealThumb);

    const image1Recipe = getByTestId('1-horizontal-image');
    expect(image1Recipe).toBeInTheDocument();
    expect(image1Recipe.src).toBe(oneDrink.drinks[0].strDrinkThumb);
  });

  test('Check the done titles and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-horizontal-name');

    const title0Recipe = getByTestId('0-horizontal-name');
    expect(title0Recipe).toBeInTheDocument();
    expect(title0Recipe).toHaveTextContent(oneMeal.meals[0].strMeal);

    const title1Recipe = getByTestId('1-horizontal-name');
    expect(title1Recipe).toBeInTheDocument();
    expect(title1Recipe).toHaveTextContent(oneDrink.drinks[0].strDrink);
  });

  test('Check the done top text and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-horizontal-top-text');

    const category0Recipe = getByTestId('0-horizontal-top-text');
    expect(category0Recipe).toBeInTheDocument();
    expect(category0Recipe).toHaveTextContent(oneMeal.meals[0].strCategory);

    const category1Recipe = getByTestId('1-horizontal-top-text');
    expect(category1Recipe).toBeInTheDocument();
    expect(category1Recipe).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);
  });

  test('Check the done date and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-horizontal-done-date');

    const date0Recipe = getByTestId('0-horizontal-done-date');
    expect(date0Recipe).toBeInTheDocument();
    expect(date0Recipe).toHaveTextContent('15/06/2020');

    const date1Recipe = getByTestId('1-horizontal-done-date');
    expect(date1Recipe).toBeInTheDocument();
    expect(date1Recipe).toHaveTextContent('15/06/2020');
  });

  test('Check the done share button and their data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-horizontal-share-btn');

    const share0Recipe = getByTestId('0-horizontal-share-btn');
    expect(share0Recipe).toBeInTheDocument();
    expect(share0Recipe).toHaveAttribute('src', Icon);

    const share1Recipe = getByTestId('1-horizontal-share-btn');
    expect(share1Recipe).toBeInTheDocument();
    expect(share1Recipe).toHaveAttribute('src', Icon);
  });

  test('Check the meal category and his data-testId', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(arrAuxiliar));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DonePage />
      </Provider>, { route: '/receitas-feitas' },
    );
    await findByTestId('0-Pasta-horizontal-tag');

    const tag0Recipe = getByTestId('0-Pasta-horizontal-tag');
    expect(tag0Recipe).toBeInTheDocument();
    expect(tag0Recipe).toHaveTextContent('Pasta');

    const tag1Recipe = getByTestId('0-Curry-horizontal-tag');
    expect(tag1Recipe).toBeInTheDocument();
    expect(tag1Recipe).toHaveTextContent('Curry');
  });
});