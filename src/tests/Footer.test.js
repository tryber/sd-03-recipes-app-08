import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './helper';
import Footer from '../components/Header';

describe('Testes do componente Footer/Menu Inferior do aplicativo', () => {
  beforeEach(cleanup);

  test('O footer/menu inferior apresenta três ícones/links, com seus respectivos ids de teste', () => {
    const { queryAllByRole, queryByTestId } = renderWithRouter(<Footer />);
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const drinkListIcon = queryByTestId('drinks-bottom-btn');
    const exploreIcon = queryByTestId('explore-bottom-btn');
    const foodListIcon = queryByTestId('food - bottom - btn');

    expect(requiredLinks.length).toBe(3);
    expect(requiredIcons.length).toBe(3);
    expect(drinkListIcon).toBeInTheDocument();
    expect(exploreIcon).toBeInTheDocument();
    expect(foodListIcon).toBeInTheDocument();
  });
});
