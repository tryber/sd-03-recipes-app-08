const dataDealer = (choice, initialData) => {
  if (choice === 'meal') {
    return (
      {
        id: initialData[0].idMeal,
        type: 'meal',
        area: initialData[0].strArea,
        category: initialData[0].strCategory,
        alcoholicOrNot: false,
        name: initialData[0].strMeal,
        image: initialData[0].strMealThumb,
        instructions: initialData[0].strInstructions,
        video: initialData[0].strYoutube,
        doneDate: null,
        tags: initialData[0].strTags,
      }
    );
  }
  return (
    {
      id: initialData[0].idDrink,
      type: 'drink',
      area: null,
      category: initialData[0].strCategory,
      alcoholicOrNot: (initialData[0].strAlcoholic === 'Alcoholic'),
      name: initialData[0].strDrink,
      image: initialData.strDrinkThumb,
      instructions: initialData[0].strInstructions,
      video: null,
      doneDate: null,
      tags: initialData[0].strTags,
    }
  );
};

export default dataDealer;
