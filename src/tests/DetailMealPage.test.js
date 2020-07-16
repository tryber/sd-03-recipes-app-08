import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import MealDetailPage from '../pages/MealDetailPage';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';
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
        <MealDetailPage />
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
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
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('0-ingredient-name-and-measure');

    const ingredient0Recipe = getByTestId('0-ingredient-name-and-measure');
    expect(ingredient0Recipe).toBeInTheDocument();
    expect(ingredient0Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient1} - ${oneMeal.meals[0].strMeasure1}`,
    );

    const ingredient1Recipe = getByTestId('1-ingredient-name-and-measure');
    expect(ingredient1Recipe).toBeInTheDocument();
    expect(ingredient1Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient2} - ${oneMeal.meals[0].strMeasure2}`,
    );

    const ingredient2Recipe = getByTestId('2-ingredient-name-and-measure');
    expect(ingredient2Recipe).toBeInTheDocument();
    expect(ingredient2Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient3} - ${oneMeal.meals[0].strMeasure3}`,
    );

    const ingredient3Recipe = getByTestId('3-ingredient-name-and-measure');
    expect(ingredient3Recipe).toBeInTheDocument();
    expect(ingredient3Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient4} - 1 tin`,
    );

    const ingredient4Recipe = getByTestId('4-ingredient-name-and-measure');
    expect(ingredient4Recipe).toBeInTheDocument();
    expect(ingredient4Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient5} - ${oneMeal.meals[0].strMeasure5}`,
    );

    const ingredient5Recipe = getByTestId('5-ingredient-name-and-measure');
    expect(ingredient5Recipe).toBeInTheDocument();
    expect(ingredient5Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient6} - ${oneMeal.meals[0].strMeasure6}`,
    );

    const ingredient6Recipe = getByTestId('6-ingredient-name-and-measure');
    expect(ingredient6Recipe).toBeInTheDocument();
    expect(ingredient6Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient7} - ${oneMeal.meals[0].strMeasure7}`,
    );

    const ingredient7Recipe = getByTestId('7-ingredient-name-and-measure');
    expect(ingredient7Recipe).toBeInTheDocument();
    expect(ingredient7Recipe).toHaveTextContent(
      `- ${oneMeal.meals[0].strIngredient8} - ${oneMeal.meals[0].strMeasure8}`,
    );

    jest.restoreAllMocks();
  });

  test('Check the meal instructions and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('instructions');

    const categoryRecipe = getByTestId('instructions');
    expect(categoryRecipe).toBeInTheDocument();
    expect(categoryRecipe).toHaveTextContent('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');

    jest.restoreAllMocks();
  });

  test('Check the meal video and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('video');

    const videoRecipe = getByTestId('video');
    expect(videoRecipe).toBeInTheDocument();

    jest.restoreAllMocks();
  });

  test('Check the meal recomendation cards and their data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(drinks));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('start-recipe-btn');

    const recomendation0Recipe = getByTestId('0-recomendation-card');
    expect(recomendation0Recipe).toBeInTheDocument();
    const recomendationImg0Recipe = getByTestId('0-recomendation-img');
    expect(recomendationImg0Recipe).toBeInTheDocument();
    expect(recomendationImg0Recipe.src).toBe(drinks.drinks[0].strDrinkThumb);
    const recomendationTitle0Recipe = getByTestId('0-recomendation-title');
    expect(recomendationTitle0Recipe).toBeInTheDocument();
    expect(recomendationTitle0Recipe).toHaveTextContent(drinks.drinks[0].strDrink);

    const recomendation1Recipe = getByTestId('1-recomendation-card');
    expect(recomendation1Recipe).toBeInTheDocument();
    const recomendationImg1Recipe = getByTestId('1-recomendation-img');
    expect(recomendationImg1Recipe).toBeInTheDocument();
    expect(recomendationImg1Recipe.src).toBe(drinks.drinks[1].strDrinkThumb);
    const recomendationTitle1Recipe = getByTestId('1-recomendation-title');
    expect(recomendationTitle1Recipe).toBeInTheDocument();
    expect(recomendationTitle1Recipe).toHaveTextContent(drinks.drinks[1].strDrink);

    const recomendation2Recipe = getByTestId('2-recomendation-card');
    expect(recomendation2Recipe).toBeInTheDocument();
    const recomendationImg2Recipe = getByTestId('2-recomendation-img');
    expect(recomendationImg2Recipe).toBeInTheDocument();
    expect(recomendationImg2Recipe.src).toBe(drinks.drinks[2].strDrinkThumb);
    const recomendationTitle2Recipe = getByTestId('2-recomendation-title');
    expect(recomendationTitle2Recipe).toBeInTheDocument();
    expect(recomendationTitle2Recipe).toHaveTextContent(drinks.drinks[2].strDrink);

    const recomendation3Recipe = getByTestId('3-recomendation-card');
    expect(recomendation3Recipe).toBeInTheDocument();
    const recomendationImg3Recipe = getByTestId('3-recomendation-img');
    expect(recomendationImg3Recipe).toBeInTheDocument();
    expect(recomendationImg3Recipe.src).toBe(drinks.drinks[3].strDrinkThumb);
    const recomendationTitle3Recipe = getByTestId('3-recomendation-title');
    expect(recomendationTitle3Recipe).toBeInTheDocument();
    expect(recomendationTitle3Recipe).toHaveTextContent(drinks.drinks[3].strDrink);

    const recomendation4Recipe = getByTestId('4-recomendation-card');
    expect(recomendation4Recipe).toBeInTheDocument();
    const recomendationImg4Recipe = getByTestId('4-recomendation-img');
    expect(recomendationImg4Recipe).toBeInTheDocument();
    expect(recomendationImg4Recipe.src).toBe(drinks.drinks[4].strDrinkThumb);
    const recomendationTitle4Recipe = getByTestId('4-recomendation-title');
    expect(recomendationTitle4Recipe).toBeInTheDocument();
    expect(recomendationTitle4Recipe).toHaveTextContent(drinks.drinks[4].strDrink);

    const recomendation5Recipe = getByTestId('5-recomendation-card');
    expect(recomendation5Recipe).toBeInTheDocument();
    const recomendationImg5Recipe = getByTestId('5-recomendation-img');
    expect(recomendationImg5Recipe).toBeInTheDocument();
    expect(recomendationImg5Recipe.src).toBe(drinks.drinks[5].strDrinkThumb);
    const recomendationTitle5Recipe = getByTestId('5-recomendation-title');
    expect(recomendationTitle5Recipe).toBeInTheDocument();
    expect(recomendationTitle5Recipe).toHaveTextContent(drinks.drinks[5].strDrink);

    jest.restoreAllMocks();
  });

  test('Check the meal start button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('start-recipe-btn');

    const startRecipe = getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Iniciar Receita');

    jest.restoreAllMocks();
  });

  test('Check the meal continue button and his data-testId', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const inProgress = { meals: { [oneMeal.meals[0].idMeal]: [] }, cocktails: {} };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    const { getByTestId, findByTestId } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );
    await findByTestId('start-recipe-btn');

    const startRecipe = getByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    expect(startRecipe).toHaveTextContent('Continuar Receita');

    jest.restoreAllMocks();
  });

  test('Check the meal start button is not present', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => callApi(oneMeal));
    const done = { id: oneMeal.meals[0].idMeal };
    localStorage.setItem('doneRecipes', JSON.stringify(done));
    const { queryByText } = renderWithRouter(
      <Provider>
        <MealDetailPage />
      </Provider>, { route: '/comidas/52977' },
    );

    expect(queryByText('Iniciar Receita')).not.toBeInTheDocument();
    expect(queryByText('Continuar Receita')).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
