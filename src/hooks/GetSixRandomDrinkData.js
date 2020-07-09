import { useState } from 'react';
import {
  fetchRandomMealID,
  fetchRandomDrinkID,
} from '../services/fatchRandom';

const drinkCall = (randomData, setRandomData, setRandomError, setRandomSuggest) => {
  // let ArrConstructor = [];
  for (let i = 0; i < 6; i += 1) {
    fetchRandomDrinkID(randomData, setRandomData, setRandomError);
    // setArrIndex(randomData);
    // ArrConstructor = [...ArrConstructor, arrIndex];
  }
  setRandomSuggest(randomData);
};

const foodCall = (randomData, setRandomData, setRandomError, setRandomSuggest) => {
  // let ArrConstructor = [];
  for (let i = 0; i < 6; i += 1) {
    fetchRandomMealID(randomData, setRandomData, setRandomError);
    // setArrIndex(randomData);
    // ArrConstructor = [...ArrConstructor, arrIndex];
  }
  setRandomSuggest(randomData);
};

export default function GetSixRandomDrinkData() {
  // const [arrIndex, setArrIndex] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [randomSuggest, setRandomSuggest] = useState([]);
  const [randomError, setRandomError] = useState('');

  function fetchRandomCall(choice) {
    if (choice === 'meal') drinkCall(randomData, setRandomData, setRandomError, setRandomSuggest);
    if (choice === 'drink') foodCall(randomData, setRandomData, setRandomError, setRandomSuggest);
  }

  return {
    randomSuggest,
    setRandomSuggest,
    randomError,
    fetchRandomCall,
  };
}
