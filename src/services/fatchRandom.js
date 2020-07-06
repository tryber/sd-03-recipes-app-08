import * as requestFunctions from './meals&drinksAPI';

function fetchRandomMealID(setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData(response.meals);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

function fetchRandomDrinkID(setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData(response.meals);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

export { fetchRandomMealID, fetchRandomDrinkID };
