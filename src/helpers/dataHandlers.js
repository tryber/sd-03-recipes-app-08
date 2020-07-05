export const maximumRecipeGrid = (data) => data.slice(0, 12);

export const maximumCategoriesGrid = (data) => data.slice(0, 5);

export const toogleCategories = (callback, string, value) => (string !== 'All' && string === value ? callback('All') : callback(value));

export const noDataAlert = () => {
  const message = alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  return !message && window.location.reload(true);
};
