import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import DrinkDetailPage from '../pages/DrinkDetailPage';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';
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

describe('Detail meal component test', () => {
  afterEach(cleanup);

  test('Check if the loading happens', async () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>,
    );
    const loadTest = getByText('Loading...');
    expect(loadTest).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the meal photo and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('recipe-photo');

    const imageRecipe = getByTestId('recipe-photo');
    expect(imageRecipe).toBeInTheDocument();
    expect(imageRecipe.src).toBe(oneDrink.drinks[0].strDrinkThumb);

    jest.restoreAllMocks();
  });

  test('Check the meal title and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('recipe-title');

    const titleRecipe = getByTestId('recipe-title');
    expect(titleRecipe).toBeInTheDocument();
    expect(titleRecipe).toHaveTextContent(oneDrink.drinks[0].strDrink);

    jest.restoreAllMocks();
  });

  test('Check the meal category and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('recipe-category');

    const categoryRecipe = getByTestId('recipe-category');
    expect(categoryRecipe).toBeInTheDocument();
    expect(categoryRecipe).toHaveTextContent(oneDrink.drinks[0].strAlcoholic);

    jest.restoreAllMocks();
  });

  test('Check the meal share button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
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
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
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

  test('Check the meal ingredients and their data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('0-ingredient-name-and-measure');

    const ingredient0Recipe = getByTestId('0-ingredient-name-and-measure');
    expect(ingredient0Recipe).toBeInTheDocument();
    expect(ingredient0Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient1} - ${oneDrink.drinks[0].strMeasure1}`,
    );

    const ingredient1Recipe = getByTestId('1-ingredient-name-and-measure');
    expect(ingredient1Recipe).toBeInTheDocument();
    expect(ingredient1Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient2} - ${oneDrink.drinks[0].strMeasure2}`,
    );

    const ingredient2Recipe = getByTestId('2-ingredient-name-and-measure');
    expect(ingredient2Recipe).toBeInTheDocument();
    expect(ingredient2Recipe).toHaveTextContent(
      `- ${oneDrink.drinks[0].strIngredient3} - ${oneDrink.drinks[0].strMeasure3}`,
    );

    jest.restoreAllMocks();
  });

  test('Check the meal recomendation cards and their data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(meals));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('start-recipe-btn');

    const recomendation0Recipe = getByTestId('0-recomendation-card');
    expect(recomendation0Recipe).toBeInTheDocument();
    const recomendationImg0Recipe = getByTestId('0-recomendation-img');
    expect(recomendationImg0Recipe).toBeInTheDocument();
    expect(recomendationImg0Recipe.src).toBe(meals.meals[0].strMealThumb);
    const recomendationTitle0Recipe = getByTestId('0-recomendation-title');
    expect(recomendationTitle0Recipe).toBeInTheDocument();
    expect(recomendationTitle0Recipe).toHaveTextContent(meals.meals[0].strMeal);

    const recomendation1Recipe = getByTestId('1-recomendation-card');
    expect(recomendation1Recipe).toBeInTheDocument();
    const recomendationImg1Recipe = getByTestId('1-recomendation-img');
    expect(recomendationImg1Recipe).toBeInTheDocument();
    expect(recomendationImg1Recipe.src).toBe(meals.meals[1].strMealThumb);
    const recomendationTitle1Recipe = getByTestId('1-recomendation-title');
    expect(recomendationTitle1Recipe).toBeInTheDocument();
    expect(recomendationTitle1Recipe).toHaveTextContent(meals.meals[1].strMeal);

    const recomendation2Recipe = getByTestId('2-recomendation-card');
    expect(recomendation2Recipe).toBeInTheDocument();
    const recomendationImg2Recipe = getByTestId('2-recomendation-img');
    expect(recomendationImg2Recipe).toBeInTheDocument();
    expect(recomendationImg2Recipe.src).toBe(meals.meals[2].strMealThumb);
    const recomendationTitle2Recipe = getByTestId('2-recomendation-title');
    expect(recomendationTitle2Recipe).toBeInTheDocument();
    expect(recomendationTitle2Recipe).toHaveTextContent(meals.meals[2].strMeal);

    const recomendation3Recipe = getByTestId('3-recomendation-card');
    expect(recomendation3Recipe).toBeInTheDocument();
    const recomendationImg3Recipe = getByTestId('3-recomendation-img');
    expect(recomendationImg3Recipe).toBeInTheDocument();
    expect(recomendationImg3Recipe.src).toBe(meals.meals[3].strMealThumb);
    const recomendationTitle3Recipe = getByTestId('3-recomendation-title');
    expect(recomendationTitle3Recipe).toBeInTheDocument();
    expect(recomendationTitle3Recipe).toHaveTextContent(meals.meals[3].strMeal);

    const recomendation4Recipe = getByTestId('4-recomendation-card');
    expect(recomendation4Recipe).toBeInTheDocument();
    const recomendationImg4Recipe = getByTestId('4-recomendation-img');
    expect(recomendationImg4Recipe).toBeInTheDocument();
    expect(recomendationImg4Recipe.src).toBe(meals.meals[4].strMealThumb);
    const recomendationTitle4Recipe = getByTestId('4-recomendation-title');
    expect(recomendationTitle4Recipe).toBeInTheDocument();
    expect(recomendationTitle4Recipe).toHaveTextContent(meals.meals[4].strMeal);

    const recomendation5Recipe = getByTestId('5-recomendation-card');
    expect(recomendation5Recipe).toBeInTheDocument();
    const recomendationImg5Recipe = getByTestId('5-recomendation-img');
    expect(recomendationImg5Recipe).toBeInTheDocument();
    expect(recomendationImg5Recipe.src).toBe(meals.meals[5].strMealThumb);
    const recomendationTitle5Recipe = getByTestId('5-recomendation-title');
    expect(recomendationTitle5Recipe).toBeInTheDocument();
    expect(recomendationTitle5Recipe).toHaveTextContent(meals.meals[5].strMeal);

    jest.restoreAllMocks();
  });

  test('Check the meal start button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('start-recipe-btn');

    const startRecipe = getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Iniciar Receita');

    jest.restoreAllMocks();
  });

  test('Check the meal continue button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const inProgress = { drinks: {}, cocktails: { [oneDrink.drinks[0].idDrink]: [] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );
    await findByTestId('start-recipe-btn');

    const startRecipe = getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Continuar Receita');

    jest.restoreAllMocks();
  });

  test('Check the meal start button is not present', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneDrink));
    const done = { id: oneDrink.drinks[0].idDrink };
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    const { queryByText } = renderWithRouter(
      <Provider>
        <DrinkDetailPage />
      </Provider>, { route: '/bebidas/178319' },
    );

    expect(queryByText('Iniciar Receita')).not.toBeInTheDocument();
    expect(queryByText('Continuar Receita')).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
