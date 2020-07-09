import * as requestFunctions from './meals&drinksAPI';

function fetchRandomMealID(randomData, setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData([...randomData, response.meals]);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

function fetchRandomDrinkID(randomData, setRandomData, setRandomError) {
  requestFunctions.getRandomFood().then(
    (response) => {
      setRandomData([...randomData, response.meals]);
    },
    (response) => {
      setRandomError(response.message);
    },
  );
}

export { fetchRandomMealID, fetchRandomDrinkID };
