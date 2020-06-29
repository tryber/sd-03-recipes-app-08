import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

describe('Testes do componente header do aplicativo', () => {
  beforeEach(cleanup);

  test('Na tela principal de comida/bebida o header possui os ícones de profile e search, é possível abrir a barra de busca clicando no ícone de search', () => {
    const { queryAllByRole, queryByTestId } = renderWithRouter(
      <Provider>
        <Header
          iconProfile={profileIcon}
          iconSearch={searchIcon}
          title="Comidas"
        />
      </Provider>,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredSearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(1);
    expect(requiredButtons.length).toBe(1);
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredSearchIcon).toBeInTheDocument();

    fireEvent.click(requiredSearchIcon);

    const requiredSearchInput = queryByTestId('search-input');
    const requiredSubmitButton = queryByTestId('exec-search-btn');
    const requiredIngredientSearchSelector = queryByTestId(
      'ingredient-search-radio',
    );
    const requiredNameSearchSelector = queryByTestId('name-search-radio');
    const requiredFirstLetterSearchselector = queryByTestId(
      'first-letter-search-radio',
    );

    expect(requiredSearchInput).toBeInTheDocument();
    expect(requiredSubmitButton).toBeInTheDocument();
    expect(requiredIngredientSearchSelector).toBeInTheDocument();
    expect(requiredNameSearchSelector).toBeInTheDocument();
    expect(requiredFirstLetterSearchselector).toBeInTheDocument();
  });

  test('Na tela principal de comida, o header possui o título `Comidas` e os ícones/links de profile e search', () => {
    const { getByText, queryAllByRole, queryByTestId } = renderWithRouter(
      <Provider>
        <Header
          iconProfile={profileIcon}
          iconSearch={searchIcon}
          title="Comidas"
        />
      </Provider>,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitle = getByText('Comidas');
    const requiredTitleTestId = queryByTestId('page-title');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredSearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(1);
    expect(requiredButtons.length).toBe(1);
    expect(requiredTitle).toBeInTheDocument();
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredSearchIcon).toBeInTheDocument();
  });

  test('Na tela principal de bebida, o header possui o título `Bebidas` e os ícones/links de profile e search', () => {
    const { getByText, queryAllByRole, queryByTestId } = renderWithRouter(
      <Provider>
        <Header
          iconProfile={profileIcon}
          iconSearch={searchIcon}
          title="Bebidas"
        />
      </Provider>,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitle = getByText('Bebidas');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredSearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(1);
    expect(requiredButtons.length).toBe(1);
    expect(requiredTitle).toBeInTheDocument();
    const requiredTitleTestId = queryByTestId('page-title');
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredSearchIcon).toBeInTheDocument();
  });

  test('Na tela de explorar comidas/bebidas, receitas feitas, receitas favoritas, perfil o header possui o título da tela do aplicativo e apenas o ícone de profile', () => {
    const { queryAllByRole, queryByTestId } = renderWithRouter(
      <Provider>
        <Header
          iconProfile={profileIcon}
          title="Comidas"
        />
      </Provider>,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitleTestId = queryByTestId('page-title');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredSearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(1);
    expect(requiredButtons.length).toBe(0);
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredSearchIcon).not.toBeInTheDocument();
  });
});
