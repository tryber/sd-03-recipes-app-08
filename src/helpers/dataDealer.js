function dataDealer(choice, initialData) {
  if (choice === 'meal') {
    return ({
      id: initialData[0].idMeal,
      type: 'comida',
      area: initialData[0].strArea,
      category: initialData[0].strCategory,
      alcoholicOrNot: '',
      name: initialData[0].strMeal,
      image: initialData[0].strMealThumb,
      instructions: initialData[0].strInstructions,
      video: initialData[0].strYoutube,
      tags: initialData[0].strTags,
    });
  }
  return ({
    id: initialData[0].idDrink,
    type: 'drink',
    area: '',
    category: initialData[0].strCategory,
    alcoholicOrNot: (initialData[0].strAlcoholic === 'Alcoholic'),
    name: initialData[0].strDrink,
    image: initialData.strDrinkThumb,
    instructions: initialData[0].strInstructions,
    video: '',
    tags: initialData[0].strTags,
  });
}

export default dataDealer;
