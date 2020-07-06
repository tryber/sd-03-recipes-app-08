import { useState, useEffect } from 'react';
import {
  fetchRandomMealID,
  fetchRandomDrinkID,
} from '../services/fatchRandom';

export default function getSixRandomDrinkData() {
  const [arrIndex, setArrIndex] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [randomSuggest, setRandomSuggest] = useState([]);
  const [randomError, setRandomError] = useState('');

  useEffect(() => {
    fetchRandomDrinkID(setRandomData, setRandomError);
    fetchRandomMealID(setRandomData, setRandomError);
  }, [randomError]);

  const drinkCall = () => {
    let ArrConstructor = [];
    for (let i = 0; i < 6; i += 1) {
      fetchRandomDrinkID(setRandomData, setRandomError);
      setArrIndex(randomData);
      ArrConstructor = [...ArrConstructor, arrIndex];
      setRandomSuggest(ArrConstructor);
    }
    setRandomSuggest(ArrConstructor);
  };

  const foodCall = () => {
    let ArrConstructor = [];
    for (let i = 0; i < 6; i += 1) {
      fetchRandomMealID(setRandomData, setRandomError);
      setArrIndex(randomData);
      ArrConstructor = [...ArrConstructor, arrIndex];
      setRandomSuggest(ArrConstructor);
    }
    setRandomSuggest(ArrConstructor);
  };

  const fatchRandoCall = (choice) => {
    if (choice === 'meal') drinkCall();
    if (choice === 'drink') foodCall();
  };


  return {
    randomSuggest,
    setRandomSuggest,
    randomError,
    fatchRandoCall,
  };
}
