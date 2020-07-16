import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import DrinkInProgressPage from '../pages/DrinkInProgressPage';
import oneDrink from '../../cypress/mocks/oneDrink';
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

describe('In progress Drink component test', () => {
  afterEach(cleanup);

  test('Check if the loading happens', async () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>,
    );
    const loadTest = getByText('Loading...');
    expect(loadTest).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the drink photo and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('recipe-photo');

    const imageRecipe = getByTestId('recipe-photo');
    expect(imageRecipe).toBeInTheDocument();
    expect(imageRecipe.src).toBe(oneDrink.drinks[0].strDrinkThumb);

    jest.restoreAllMocks();
  });

  test('Check the drink title and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('recipe-title');

    const titleRecipe = getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    expect(titleRecipe).toHaveTextContent(oneDrink.drinks[0].strDrink);

    jest.restoreAllMocks();
  });

  test('Check the drink category and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('recipe-category');

    const categoryRecipe = getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();
    expect(categoryRecipe).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);

    jest.restoreAllMocks();
  });

  test('Check the drink share button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('share-btn');

    const shareRecipe = getByTestId('share-btn');
    expect(shareRecipe).toBeInTheDocument();
    expect(shareRecipe).toHaveAttribute('src', Icon);
    // fireEvent.click(shareRecipe);
    // console.log(navigator.clipboard);

    jest.restoreAllMocks();
  });

  test('Check the drink favorite button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('favorite-btn');

    const favoriteRecipe = getByTestId('favorite-btn');
    expect(favoriteRecipe).toBeInTheDocument();
    expect(favoriteRecipe).toHaveAttribute('src', WhiteHeart);
    fireEvent.click(favoriteRecipe);
    expect(favoriteRecipe).toHaveAttribute('src', BlackHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(1);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))[0].id).toBe(oneDrink.drinks[0].idDrink);
    fireEvent.click(favoriteRecipe);
    expect(favoriteRecipe).toHaveAttribute('src', WhiteHeart);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')).length).toBe(0);

    jest.restoreAllMocks();
  });

  test('Check the drink ingredients and their data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('0-ingredient-step');

    const ingredient0Recipe = getByTestId('0-ingredient-step');
    expect(ingredient0Recipe).toBeInTheDocument();
    expect(ingredient0Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient1} - ${oneDrink.drinks[0].strMeasure1}`,
    );

    const ingredient1Recipe = getByTestId('1-ingredient-step');
    expect(ingredient1Recipe).toBeInTheDocument();
    expect(ingredient1Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient2} - ${oneDrink.drinks[0].strMeasure2}`,
    );

    const ingredient2Recipe = getByTestId('2-ingredient-step');
    expect(ingredient2Recipe).toBeInTheDocument();
    expect(ingredient2Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient3} - ${oneDrink.drinks[0].strMeasure3}`,
    );

    jest.restoreAllMocks();
  });

  test('Check the Drink ingredient can be marked', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const inProgress = { drinks: { [oneDrink.drinks[0].idDrink]: [] }, cocktails: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('0-ingredient-step');

    const ingredientClickTest = getByTestId('0-ingredient-step').firstElementChild.firstElementChild;
    expect(ingredientClickTest).not.toBeChecked();
    fireEvent.click(ingredientClickTest);
    expect(ingredientClickTest).toBeChecked();

    jest.restoreAllMocks();
  });

  test('Check the drink finish button, his data-testId, and start disabled', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('finish-recipe-btn');

    const startRecipe = getByTestId('finish-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toBeDisabled();

    jest.restoreAllMocks();
  });

  test('Check the drink continue button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const inProgress = { drinks: {}, cocktails: { [oneDrink.drinks[0].idDrink]: [0,1,2] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkInProgressPage />
      </Provider>, { route: '/bebidas/178319/in-progress' },
    );
    await findByTestId('finish-recipe-btn');

    const startRecipe = getByTestId('finish-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toBeEnabled();

    jest.restoreAllMocks();
  });
});