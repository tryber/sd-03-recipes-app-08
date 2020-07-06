import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RecipeAppContext } from '../context';

const changeContext = (choice, setChoice) => {
  if (choice === 'meal') setChoice('drink');
  if (choice === 'drink') setChoice('meal');
};

const SuggestionCard = (id, name, thumbnail, index, choice, setChoice) => (
  <Link
    to={(choice === 'meal') ? `/bebidas/${id}` : `/comidas/${id}`}
    onClick={() => changeContext(id, choice, setChoice)}
  >
    <div data-testid={`${index}-recomendation-card`} className="recomendation-card">
      <img
        src={thumbnail}
        alt={name}
        data-testid={`${index}-recomendation-img`}
        className="recomendation-image"
      />
      <h5 data-testid={`${index}-recomendation-title`} className="recomendation-title">
        {name}
      </h5>
    </div>
  </Link>
);

// const CreateFoodArr = (foodCall, data) => {
//   let ArrConstructor = [];
//   for (let i = 0; i < 6; i += 1) {
//     foodCall();
//     ArrConstructor = [...ArrConstructor, data];
//   }
//   return ArrConstructor;
// };

// const CreateDrinkArr = (drinkCall, data) => {
//   const ArrConstructor = [];
//   for (let i = 0; i < 6; i += 1) {
//     drinkCall();
//     ArrConstructor.push(data);
//   }
//   return ArrConstructor;
// };

const creatingredientsArr = (choice, detailData) => {
  if (choice === 'meal') {
    return ({
      id: detailData.idMeal,
      name: detailData.strMeal,
      image: detailData.strMealThumb,
    });
  }
  return ({
    id: detailData.idDrink,
    name: detailData.strDrink,
    image: detailData.strDrinkThumb,
  });
};

const Suggestions = () => {
  const {
    choice,
    setChoice,
    randomDataCall: {
      // randomData = [],
      fetchRandomCall,
      randomSuggest,
    },
  } = useContext(RecipeAppContext);

  useEffect(() => {
    fetchRandomCall(choice);
  }, [randomSuggest]);


  // const initialSuggestArr = [];
  // for (let i = 0; i < 6; i += 1) {
  //   if (choice === 'meal') fetchRandomDrinkID();
  //   if (choice === 'drink') fetchRandomMealID();
  //   initialSuggestArr.push(randomData);
  // }

  return (
    <div>
      {randomSuggest.map((elem, index) => {
        const finalArr = creatingredientsArr(choice, elem);
        return (
          SuggestionCard(
            finalArr.id,
            finalArr.name,
            finalArr.thumbnail,
            index,
            choice,
            setChoice,
          ));
      })}
    </div>
  );
};

export default Suggestions;
