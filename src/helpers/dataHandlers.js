export const maximumRecipeGrid = (data) => data.slice(0, 12);
export const maximumCategoriesGrid = (data) => data.slice(0, 5);
export const toogleCategories = (callback, string, value) => (string !== 'All' && string === value ? callback('All') : callback(value));
