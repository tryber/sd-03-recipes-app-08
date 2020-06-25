import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './helper';
import Header from '../components/Header';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

describe('Testes do componente header do aplicativo', () => {
  beforeEach(cleanup);

  test('Na tela principal de comida/bebida o header possui os ícones de profile e search ', () => {
    const { queryAllByRole, queryByTestId } = renderWithRouter(
      <Header iconProfile={profileIcon} iconSearch={searchIcon} title="Comidas" />,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredsearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(2);
    expect(requiredButtons.length).toBe(1);
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredsearchIcon).toBeInTheDocument();
  });

  test('Na tela principal de comida, o header possui o título `Comidas` e os ícones/links de profile e search', () => {
    const { getByText, queryAllByRole, queryByTestId } = renderWithRouter(
      <Header
        iconProfile={profileIcon}
        iconSearch={searchIcon}
        title="Comidas"
      />,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitle = getByText('Comidas');
    const requiredTitleTestId = queryByTestId('page-title');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredsearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(2);
    expect(requiredButtons.length).toBe(1);
    expect(requiredTitle).toBeInTheDocument();
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredsearchIcon).toBeInTheDocument();
  });

  test('Na tela principal de comida, o header possui o título `Bebidas` e os ícones/links de profile e search', () => {
    const { getByText, queryAllByRole, queryByTestId } = renderWithRouter(
      <Header
        iconProfile={profileIcon}
        iconSearch={searchIcon}
        title="Bebidas"
      />,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitle = getByText('Bebidas');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredsearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(2);
    expect(requiredButtons.length).toBe(1);
    expect(requiredTitle).toBeInTheDocument();
    const requiredTitleTestId = queryByTestId('page-title');
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredsearchIcon).toBeInTheDocument();
  });

  test('Na tela de explorar comidas/bebidas, receitas feitas, receitas favoritas, perfil o header possui o título da tela do aplicativo e apenas o ícone de profile', () => {
    const { queryAllByRole, queryByTestId } = renderWithRouter(
      <Header iconProfile={profileIcon} title="Explorar Comidas" />,
    );
    const requiredLinks = queryAllByRole('link');
    const requiredIcons = queryAllByRole('img');
    const requiredButtons = queryAllByRole('button');
    const requiredTitleTestId = queryByTestId('page-title');
    const requiredprofileIcon = queryByTestId('profile-top-btn');
    const requiredsearchIcon = queryByTestId('search-top-btn');

    expect(requiredLinks.length).toBe(1);
    expect(requiredIcons.length).toBe(1);
    expect(requiredButtons.length).toBe(0);
    expect(requiredTitleTestId).toBeInTheDocument();
    expect(requiredprofileIcon).toBeInTheDocument();
    expect(requiredsearchIcon).not.toBeInTheDocument();
  });
});
