import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './helper';
import RecipeCard from '../components/RecipeCard';

describe('Testes do componente DrinkCard', () => {
  beforeEach(cleanup);
  afterEach(cleanup);

  test('Card de bebida exibe a imagem e o nome da bebida em elementos que possuem os ids de teste corretos', () => {
    const { queryByTestId, queryAllByRole } = renderWithRouter(
      <RecipeCard
        thumbnail="https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg"
        name="Martinez 2"
        index={0}
        id="17256"
        path="bebidas"
      />,
    );
    const recipe = queryByTestId('0-recipe-card');
    const requiredThumbnail = queryByTestId('0-card-img');
    const requiredTitle = queryByTestId('0-card-name');
    const checkImageQuantities = queryAllByRole('img');

    expect(recipe).toBeInTheDocument();
    expect(requiredThumbnail).toBeInTheDocument();
    expect(requiredThumbnail.alt).toBe('Martinez 2');
    expect(requiredThumbnail.src).toBe(
      'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
    );
    expect(requiredTitle).toBeInTheDocument();
    expect(checkImageQuantities.length).toBe(1);
  });
});
