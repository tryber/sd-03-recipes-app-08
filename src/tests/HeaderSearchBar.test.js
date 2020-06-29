import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import HeaderSearchBar from '../components/HeaderSearchBar';

describe('Testes do componente HeaderSearchBar', () => {
  beforeEach(cleanup);

  test('Elementos obrigatórios estão presentes na página', () => {
    const { getAllByRole, queryByRole, queryByTestId } = render(
      <Provider>
        <HeaderSearchBar />
      </Provider>,
    );
    const requiredSearchInput = queryByTestId('search-input');
    const requiredSubmitButton = queryByRole('button');
    const requiredRadioButtons = getAllByRole('radio');

    expect(requiredSearchInput).toBeInTheDocument();
    expect(requiredSearchInput.placeholder).toBe('Buscar Receita');
    expect(requiredSubmitButton).toBeInTheDocument();
    expect(requiredRadioButtons.length).toBe(3);
  });

  test('Elementos obrigatórios possuem testids corretas', () => {
    const { queryByTestId } = render(
      <Provider>
        <HeaderSearchBar />
      </Provider>,
    );
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

  test('Após a busca o input de texto é limpo', () => {
    const { queryByTestId } = render(
      <Provider>
        <HeaderSearchBar />
      </Provider>,
    );
    const requiredSearchInput = queryByTestId('search-input');
    const requiredIngredientSearchSelector = queryByTestId(
      'ingredient-search-radio',
    );
    const requiredSubmitButton = queryByTestId('exec-search-btn');

    fireEvent.change(requiredSearchInput, { target: { value: 'o' } });
    fireEvent.click(requiredIngredientSearchSelector);
    fireEvent.click(requiredSubmitButton);

    expect(requiredSearchInput.value).toBe('');
  });
});
