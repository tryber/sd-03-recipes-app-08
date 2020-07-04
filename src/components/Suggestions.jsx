import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeAppContext } from '../context';

const changeContext = (id, setSelectedID, choice, setChoice) => {
  setSelectedID(id);
  if (choice === 'meal') setChoice('drink');
  if (choice === 'drink') setChoice('meal');
};

const SuggestionCard = (id, name, thumbnail, index, setSelectedID, choice, setChoice) => (
  <Link
    to={(choice === 'meal') ? `/bebidas/${id}` : `/comidas/${id}`}
    onClick={changeContext(id, setSelectedID, choice, setChoice)}
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

const CreateFoodArr = (foodCall) => {
  const ArrConstructor = [];
  for (let i = 0; i < 6; i += 1) {
    const constructor = foodCall();
    ArrConstructor.push(constructor);
  }
  return ArrConstructor;
};

const CreateDrinkArr = (drinkCall) => {
  const ArrConstructor = [];
  for (let i = 0; i < 6; i += 1) {
    const constructor = drinkCall();
    ArrConstructor.push(constructor);
  }
  return ArrConstructor;
};


const creatingredientsArr = (choice, detailData) => {
  if (choice === 'meal') {
    return (
      {
        id: detailData.idMeal,
        type: 'meal',
        name: detailData.strMeal,
        image: detailData.strMealThumb,
      }
    );
  }
  return (
    {
      id: detailData.idDrink,
      name: detailData.strDrink,
      image: detailData.strDrinkThumb,
    }
  );
};

const Suggestions = () => {
  const {
    setSelectedID,
    fetchRandomMealID,
    fetchRandomDrinkID,
    choice,
    setChoice,
  } = useContext(RecipeAppContext);

  const initialSuggestArr = (choice === 'meal')
    ? CreateDrinkArr(fetchRandomDrinkID)
    : CreateFoodArr(fetchRandomMealID);
  const FinalSuggestArr = creatingredientsArr(choice, initialSuggestArr);

  return (
    <div>
      {FinalSuggestArr.map((elem, index) => SuggestionCard(
        elem.id,
        elem.name,
        elem.thumbnail,
        index,
        setSelectedID,
        choice,
        setChoice,
      ))}
    </div>
  );
};

export default Suggestions;
