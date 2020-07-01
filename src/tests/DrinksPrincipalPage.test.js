import React from 'react';
import { cleanup } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import DrinksPrincipalPage from '../pages/DrinksPrincipalPage';

describe('Drinks Main Page test', () => {
  afterEach(cleanup);

  test('Page renders on correct route', () => {
    const { history } = renderWithRouter(
      <Provider>
        <DrinksPrincipalPage />
      </Provider>,
    );
    history.push('/bebidas');
    const { pathname } = history.location;

    expect(pathname).toBe('/bebidas');
  });
});
