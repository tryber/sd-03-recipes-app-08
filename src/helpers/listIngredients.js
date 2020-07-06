const listIgredients = (detailData) => {
  const ingredients = Object.entries(detailData[0]).filter((elem) => elem[0].match(/strIngredient/i));
  const measures = Object.entries(detailData[0]).filter((elem) => elem[0].match(/strMeasure/i));
  const arr = ingredients.reduce((acc, elem, index) => {
    if (elem[1]) {
      return [...acc, `- ${elem[1]} - ${measures[index][1]}`];
    }
    return acc;
  }, []);
  return arr;
};

export default listIgredients;
