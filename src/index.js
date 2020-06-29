import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { RecipeAppProvider as Provider } from './context';
import * as serviceWorker from './serviceWorker';

<<<<<<< HEAD
// Starting
ReactDOM.render(<App />, document.getElementById('root'));
=======
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
>>>>>>> 7c26454e6a43b85bf90a397d81140b2ca6643b26

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
