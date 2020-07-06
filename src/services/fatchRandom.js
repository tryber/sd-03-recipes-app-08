import * as requestFunctions from './meals&drinksAPI';

function fetchRandomMealID(setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData(response.meals);
      console.log(response);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

function fetchRandomDrinkID(setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData(response.drinks);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

export { fetchRandomMealID, fetchRandomDrinkID };
