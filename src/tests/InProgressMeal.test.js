import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import MealInProgressPage from '../pages/MealInProgressPage';
import oneMeal from '../../cypress/mocks/oneMeal';
import BlackHeart from '../images/blackHeartIcon.svg';
import WhiteHeart from '../images/whiteHeartIcon.svg';
import Icon from '../images/shareIcon.svg';

const callApi = (data) => {
  const mockSuccessResponse = data;
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    status: 200,
    ok: true,
    json: () => mockJsonPromise,
  });
  return mockFetchPromise;
};

describe('In progress meal component test', () => {
  afterEach(cleanup);

  test('Check if the loading happens', async () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>,
    );
    const loadTest = getByText('Loading...');
    expect(loadTest).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the meal photo and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('recipe-photo');

    const imageRecipe = getByTestId('recipe-photo');
    expect(imageRecipe).toBeInTheDocument();
    expect(imageRecipe.src).toBe(oneMeal.meals[0].strMealThumb);

    jest.restoreAllMocks();
  });

  test('Check the meal title and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('recipe-title');

    const titleRecipe = getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    expect(titleRecipe).toHaveTextContent(oneMeal.meals[0].strMeal);

    jest.restoreAllMocks();
  });

  test('Check the meal category and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('recipe-category');

    const categoryRecipe = getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();
    expect(categoryRecipe).toHaveTextContent(oneMeal.meals[0].strCategory);

    jest.restoreAllMocks();
  });

  test('Check the meal share button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('share-btn');

    const shareRecipe = getByTestId('share-btn');
    expect(shareRecipe).toBeInTheDocument();
    expect(shareRecipe).toHaveAttribute('src', Icon);
    // fireEvent.click(shareRecipe);
    // console.log(navigator.clipboard);

    jest.restoreAllMocks();
  });

  test('Check the meal favorite button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('favorite-btn');

    const favoriteRecipe = getByTestId('favorite-btn');
    expect(favoriteRecipe).toBeInTheDocument();
    expect(favoriteRecipe).toHaveAttribute('src', WhiteHeart);
    fireEvent.click(favoriteRecipe);
    expect(favoriteRecipe).toHaveAttribute('src', BlackHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].id).toBe(oneMeal.meals[0].idMeal);
    fireEvent.click(favoriteRecipe);
    expect(favoriteRecipe).toHaveAttribute('src', WhiteHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(0);

    jest.restoreAllMocks();
  });

  test('Check the meal ingredients and their data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('0-ingredient-step');

    const ingredient0Recipe = getByTestId('0-ingredient-step');
    expect(ingredient0Recipe).toBeInTheDocument();
    expect(ingredient0Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient1} - ${oneMeal.meals[0].strMeasure1}`,
    );

    const ingredient1Recipe = getByTestId('1-ingredient-step');
    expect(ingredient1Recipe).toBeInTheDocument();
    expect(ingredient1Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient2} - ${oneMeal.meals[0].strMeasure2}`,
    );

    const ingredient2Recipe = getByTestId('2-ingredient-step');
    expect(ingredient2Recipe).toBeInTheDocument();
    expect(ingredient2Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient3} - ${oneMeal.meals[0].strMeasure3}`,
    );

    const ingredient3Recipe = getByTestId('3-ingredient-step');
    expect(ingredient3Recipe).toBeInTheDocument();
    expect(ingredient3Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient4} - 1 tin`,
    );

    const ingredient4Recipe = getByTestId('4-ingredient-step');
    expect(ingredient4Recipe).toBeInTheDocument();
    expect(ingredient4Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient5} - ${oneMeal.meals[0].strMeasure5}`,
    );

    const ingredient5Recipe = getByTestId('5-ingredient-step');
    expect(ingredient5Recipe).toBeInTheDocument();
    expect(ingredient5Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient6} - ${oneMeal.meals[0].strMeasure6}`,
    );

    const ingredient6Recipe = getByTestId('6-ingredient-step');
    expect(ingredient6Recipe).toBeInTheDocument();
    expect(ingredient6Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient7} - ${oneMeal.meals[0].strMeasure7}`,
    );

    const ingredient7Recipe = getByTestId('7-ingredient-step');
    expect(ingredient7Recipe).toBeInTheDocument();
    expect(ingredient7Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient8} - ${oneMeal.meals[0].strMeasure8}`,
    );

    jest.restoreAllMocks();
  });

  test('Check the meal ingredient can be marked', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const inProgress = { meals: { [oneMeal.meals[0].idMeal]: [] }, cocktails: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('0-ingredient-step');

    const ingredientClickTest = getByTestId('0-ingredient-step').firstElementChild.firstElementChild;
    expect(ingredientClickTest).not.toBeChecked();
    fireEvent.click(ingredientClickTest);
    expect(ingredientClickTest).toBeChecked();

    jest.restoreAllMocks();
  });

  test('Check the meal finish button, his data-testId, and start disabled', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('finish-recipe-btn');

    const startRecipe = getByTestId('finish-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toBeDisabled();

    jest.restoreAllMocks();
  });

  test('Check the meal continue button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const inProgress = { meals: { [oneMeal.meals[0].idMeal]: [0,1,2,3,4,5,6,7] }, cocktails: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealInProgressPage />
      </Provider>, { route: '/comidas/52977/in-progress' },
    );
    await findByTestId('finish-recipe-btn');

    const startRecipe = getByTestId('finish-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toBeEnabled();

    jest.restoreAllMocks();
  });
});