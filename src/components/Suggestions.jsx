import React, { useContext } from 'react';
import { RecipeAppContext } from '../context';
import SuggestionCard from './SuggestionCard';

const creatingredientsArr = (choice, detailData) => {
  if (choice === 'meal') {
    return ({
      id: detailData.idDrink,
      name: detailData.strDrink,
      image: detailData.strDrinkThumb,
    });
  }
  return ({
    id: detailData.idMeal,
    name: detailData.strMeal,
    image: detailData.strMealThumb,
  });
};

const getData = (choice, basicDrikData, basicMealData) => {
  if (choice === 'meal') {
    const initialData = basicDrikData;
    const final = initialData.slice(0, 6);
    return final;
  }
  const initialData = basicMealData;
  const final = initialData.slice(0, 6);
  return final;
};

const Suggestions = () => {
  const {
    choice,
    basicMealData,
    basicDrikData,
  } = useContext(RecipeAppContext);

  const data = getData(choice, basicDrikData, basicMealData);
  const finalData = data.map((elem) => creatingredientsArr(choice, elem));
  const path = (choice === 'meal') ? 'bebidas' : 'comidas';

  console.log(finalData);

  return (
    <div>
      {finalData.map((elem, index) => (
        <div>
          <h2>Recomendações</h2>
          <SuggestionCard
            key={elem.id}
            thumbnail={elem.image}
            name={elem.name}
            index={index}
            id={elem.id}
            path={path}
          />
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
