import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('Farewell, front-end', () => {
  const { container } = render(<App />);
  const mealsContainer = container.querySelector('#meals');
  expect(mealsContainer).toBeInTheDocument();
});
