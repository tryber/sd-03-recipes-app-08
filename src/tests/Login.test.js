import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { RecipeAppProvider as Provider } from '../context';
import renderWithRouter from './helper';
import Login from '../pages/Login';

describe('Login component test', () => {
  beforeEach(cleanup);

  test('Check if title Login exist', () => {
    const { getByText } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const loginTitle = getByText('Login');
    expect(loginTitle).toBeInTheDocument();
  });

  test('Check if the email imput exist', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const emailImput = getByTestId('email-input');
    expect(emailImput).toBeInTheDocument();
  });

  test('Check if we can change the email imput value', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const emailImput = getByTestId('email-input');
    expect(emailImput.value).toBe('');
    fireEvent.change(emailImput, { target: { value: 'email@email.com' } });
    expect(emailImput.value).toBe('email@email.com');
  });

  test('Check if the password imput exist', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const passwordImput = getByTestId('password-input');
    expect(passwordImput).toBeInTheDocument();
  });

  test('Check if we can change the password imput value', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const passwordImput = getByTestId('password-input');
    expect(passwordImput.value).toBe('');
    fireEvent.change(passwordImput, { target: { value: 'biggerThenSIX' } });
    expect(passwordImput.value).toBe('biggerThenSIX');
  });

  test('Check if the button exist', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const enterButton = getByTestId('login-submit-btn');
    expect(enterButton).toBeInTheDocument();
  });

  test('Check if the button is disabled', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const enterButton = getByTestId('login-submit-btn');
    expect(enterButton.disabled).toBe(true);
  });

  test('Check if the button can be enable', () => {
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Login />
      </Provider>,
    );
    const emailImput = getByTestId('email-input');
    fireEvent.change(emailImput, { target: { value: 'email@email.com' } });
    const passwordImput = getByTestId('password-input');
    fireEvent.change(passwordImput, { target: { value: 'biggerThenSIX' } });
    const enterButton = getByTestId('login-submit-btn');
    expect(enterButton.disabled).not.toBe(true);
  });
});
